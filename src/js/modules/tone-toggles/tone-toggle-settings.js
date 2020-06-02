import ToneToggle from './tone-toggle';
import audioSettings from '../audio/audio-settings';
import utils from '../utils';

const toneToggleSettings = {
    numberOfToggles: 8,
    numberofBeats: 8,
    toneToggles: [],
    activeKey: 0,

    setup() {
        this.createToneToggleObjects();
        this.setupToggleInteraction();
        this.updateToggleDisplays();
        this.setToneToggleRhythm();
        this.animateToggles();
    },

    createToneToggleObjects() {
        const toggleContainerDiv = document.querySelector('.tone-toggles__toggles-container');

        for (let i = 0; i < this.numberOfToggles; i++) {
            // Create toggle DOM element
            const tt = document.createElement('div');
            tt.id = i;
            tt.classList.add('tone-toggles__toggle');
            tt.setAttribute('tabindex', '0');

            // Create object
            this.toneToggles[i] = new ToneToggle(i, audioSettings.intervals[i], tt);

            // Add note/beat display
            const noteDisplay = document.createElement('p');
            noteDisplay.classList.add('tone-toggles__display');
            tt.append(noteDisplay);

            // Append to container
            toggleContainerDiv.append(tt);
        }
    },

    setupToggleInteraction() {
        const toggleContainer = document.querySelector('.tone-toggles');
        toggleContainer.addEventListener('click', function (e) {
            if (e.target.className.includes('tone-toggles__toggle')) {
                toneToggleSettings.toneToggles[e.target.id].toggle();
                e.target.blur();
            }
        });

        const toggles = document.querySelectorAll('.tone-toggles__toggle');
        toggles.forEach((item, index) => {
            item.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    toneToggleSettings.toneToggles[index].toggle();
                }
            });
        });
    },

    updateToggleDisplays() {
        const displays = document.querySelectorAll('.tone-toggles__display');
        const notes = audioSettings.noteDisplays[this.activeKey];

        this.toneToggles.forEach((item, index) => {
            const noteDisplay = notes[index];
            displays[index].innerHTML = noteDisplay;
            item.toneColor = this.getToneToggleColor(noteDisplay);

            if (item.active) {
                item.toggleColorState();
            }
        });
    },

    // Set active color for tones
    getToneToggleColor(note) {
        for (let i = 0; i < audioSettings.colors.length; i++) {
            if (note === audioSettings.colors[i].note) {
                return audioSettings.colors[i].color;
            }
        }
    },

    // Randomly decide what beats a toggle will play on
    setToneToggleRhythm() {
        this.toneToggles.forEach((item) => {
            item.rhythm = this.generateRandomRhythm();
        });
    },

    refreshToggleRhythms() {
        this.setToneToggleRhythm();

        this.toneToggles.forEach((item) => {
            if (item.active) {
                item.toggleAudio();
            }
        });
    },

    clearTones() {
        this.toneToggles.forEach((item) => {
            if (item.active) {
                item.toggle();
            }
        });
    },

    generateRandomRhythm() {
        let rhythmPattern = [];

        // Generate random boolean to play on beat
        for (let i = 0; i < this.numberofBeats; i++) {
            const decider = utils.getRandomInteger(0, 2) <= 1;
            rhythmPattern[i] = decider;
        }

        // Check to make sure there is at least one beat playing
        for (let i = 0; i < rhythmPattern.length; i++) {
            if (rhythmPattern[i] === true) {
                return rhythmPattern;
            } else {
                this.generateRandomRhythm();
            }
        }
    },

    updateKey(selectedKey) {
        if (this.activeKey !== selectedKey) {
            this.activeKey = selectedKey;
            this.updateToggleDisplays();
        }
    },

    animateToggles() {
        this.toneToggles.forEach((item) => {
            const delay1 = 200 + item.id * 80;
            const delay2 = 360;
            setTimeout(function () {
                item.active = true;
                item.toggleColorState();
                setTimeout(function () {
                    item.active = false;
                    item.toggleColorState();
                }, delay2);
            }, delay1);
        });
    },
};

export default toneToggleSettings;
