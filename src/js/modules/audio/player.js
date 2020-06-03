import * as Tone from 'tone';
import toneToggleSettings from '../tone-toggles/tone-toggle-settings';
import keySettings from './key-settings';

const player = {
    synth: new Tone.PolySynth(8, Tone.Synth, {
        oscillator: {
            partials: [0, 2, 3, 4],
            portamento: 1,
        },
        envelope: {
            attack: 0.005,
            decay: 0.1,
            sustain: 0.3,
            release: 2,
        },
    }).toMaster(),
    keyFrequency: 0,
    activeTones: null,
    playing: false,
    sequence: null,
    bpm: 120,
    animationDelay: 0,

    setup() {
        this.setupSequence();
        this.setTempo(this.bpm);
        this.setKeyFrequency();
        this.resetActiveTones();
    },

    setupSequence() {
        this.sequence = new Tone.Sequence(
            function (time, i) {
                // Play each active tone
                player.activeTones[i].forEach((item) => {
                    const f = item.interval * player.keyFrequency;
                    player.synth.triggerAttackRelease(f, 0.125);
                    toneToggleSettings.toneToggles[item.toggleId].toggleActiveClass(
                        player.animationDelay
                    );
                });
            },
            [0, 1, 2, 3, 4, 5, 6, 7],
            '4n'
        ).start(0);
    },

    togglePlaying() {
        Tone.Transport.toggle();

        this.playing = !this.playing;

        const playButtonIcons = document.querySelectorAll('.play-btn');
        playButtonIcons.forEach((item) => {
            item.classList.toggle('play-btn--hidden');
        });
    },

    setTempo(value) {
        Tone.Transport.bpm.value = value;

        if (value !== this.bpm) {
            this.bpm = value;
        }

        this.animationDelay = 30000 / value;
    },

    setKeyFrequency(selectedKey = 0) {
        this.keyFrequency = keySettings[selectedKey].frequency;
    },

    resetActiveTones() {
        this.activeTones = [[], [], [], [], [], [], [], []];
    },
};

export default player;
