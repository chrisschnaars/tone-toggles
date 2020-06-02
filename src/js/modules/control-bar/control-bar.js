import toneToggleSettings from '../tone-toggles/tone-toggle-settings';
import player from '../audio/player';
import keySettings from '../audio/key-settings';

const controlBar = {
    setup() {
        this.setupKeyboardEvents();
        this.setupPlayButton();
        this.setupLargeScreenKeyToggle();
        this.setupSmallScreenKeyToggle();
        this.setupTempoControl();
        this.setupRefreshButton();
        this.setupClearTonesButton();
    },

    setupKeyboardEvents() {
        document.addEventListener(
            'keydown',
            function (e) {
                // Play toggle
                if (e.key === ' ') {
                    player.togglePlaying();
                }

                // Key toggle
                const keyToggleCodes = ['1', '2', '3', '4', '5'];
                for (let i = 0; i < keyToggleCodes.length; i++) {
                    if (e.key === keyToggleCodes[i]) {
                        const selectedKey = i.toString();
                        controlBar.handleKeyChange(selectedKey);
                    }
                }

                // Tone Toggles
                const toneToggleCodes = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
                for (let i = 0; i < toneToggleCodes.length; i++) {
                    if (e.key.toLowerCase() === toneToggleCodes[i]) {
                        toneToggleSettings.toneToggles[i].toggle();
                    }
                }
            },
            false
        );
    },

    setupPlayButton() {
        document.querySelector('.js-play-toggle').addEventListener(
            'click',
            function (e) {
                player.togglePlaying();
                e.target.blur();
            },
            false
        );
    },

    setupLargeScreenKeyToggle() {
        const keyToggle = document.querySelector('.js-key-toggle--large');
        keyToggle.addEventListener(
            'click',
            function (e) {
                const selectedKey = e.target.value;
                controlBar.handleKeyChange(selectedKey);
            },
            false
        );
    },

    setupSmallScreenKeyToggle() {
        const keyToggle = document.querySelector('.js-key-toggle--small');
        keyToggle.addEventListener(
            'click',
            function () {
                const keyIncrement = toneToggleSettings.activeKey + 1;
                const selectedKey = keyIncrement > keySettings.length - 1 ? 0 : keyIncrement;
                controlBar.handleKeyChange(selectedKey);
            },
            false
        );
    },

    setupTempoControl() {
        document.querySelector('.js-tempo-control').addEventListener(
            'input',
            function () {
                player.setTempo(this.value);
                document.querySelector('.js-tempo-readout').innerHTML = this.value;
                this.setAttribute('aria-valuenow', this.value);
                this.setAttribute('value', this.value);
            },
            false
        );
    },

    setupRefreshButton() {
        document.querySelector('.js-refresh-btn').addEventListener(
            'click',
            function (e) {
                player.resetActiveTones();
                toneToggleSettings.refreshToggleRhythms();
                e.target.blur();
            },
            false
        );
    },

    setupClearTonesButton() {
        document.querySelector('.js-clear-btn').addEventListener(
            'click',
            function () {
                toneToggleSettings.clearTones();

                if (player.playing) {
                    player.togglePlaying();
                }
            },
            false
        );
    },

    handleKeyChange(selectedKey) {
        player.setKeyFrequency(selectedKey);
        toneToggleSettings.updateKey(selectedKey);
        controlBar.updateKeyToggleState(selectedKey);
    },

    updateKeyToggleState(selectedKey) {
        // Update large screen toggles
        const toggleButtons = document.querySelectorAll('.js-key-toggle-btn');
        toggleButtons.forEach((item) => {
            item.classList.remove('btn--toggle-selected');
            if (item.value == selectedKey) {
                item.classList.add('btn--toggle-selected');
            }
        });

        // Update mini toggle
        const toggleButtonMini = document.querySelector('.js-key-toggle--small');
        toggleButtonMini.innerText = keySettings[selectedKey].note;
        toggleButtonMini.setAttribute('value', selectedKey);
    },
};

export default controlBar;
