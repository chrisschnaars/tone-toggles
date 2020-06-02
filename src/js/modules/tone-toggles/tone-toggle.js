import player from '../audio/player';

export default class ToneToggle {
    constructor(id, interval, div) {
        this.id = id;
        this.interval = interval;
        this.rhythm = [];
        this.toggleDiv = div;
        this.toneColor = null;
        this.textColor = '#fff';
        this.active = false;
    }

    toggle() {
        this.active = !this.active;

        this.toggleColorState();
        this.toggleAudio();

        // Start playing if turned on and paused
        if (this.active && !player.playing) {
            player.togglePlaying();
        }
    }

    toggleActiveClass(delay) {
        this.toggleDiv.classList.add('tone-toggles__toggle--active');

        setTimeout(() => {
            this.toggleDiv.classList.remove('tone-toggles__toggle--active');
        }, delay);
    }

    toggleColorState() {
        const toggleColor = this.active ? this.toneColor : null;
        const textColor = this.active ? this.textColor : null;

        this.toggleDiv.style.backgroundColor = toggleColor;
        this.toggleDiv.style.borderColor = toggleColor;
        this.toggleDiv.style.color = textColor;
    }

    toggleAudio() {
        const audioArray = player.activeTones;

        this.rhythm.forEach((item, index) => {
            if (this.active && item) {
                const toneItem = {
                    toggleId: this.id,
                    interval: this.interval,
                };

                audioArray[index].push(toneItem);
            } else if (!this.active && item) {
                const id = audioArray[index].indexOf(this.interval);
                audioArray[index].splice(id, 1);
            }
        });
    }
}
