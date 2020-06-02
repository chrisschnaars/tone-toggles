import toneToggleSettings from './modules/tone-toggles/tone-toggle-settings';
import controlBar from './modules/control-bar/control-bar';
import player from './modules/audio/player';
import setupAboutModal from './modules/about-modal/about-modal.js';

window.onload = () => {
    toneToggleSettings.setup();
    controlBar.setup();
    player.setup();
    setupAboutModal();

    // Trigger keyboard user focus state
    document.addEventListener(
        'keydown',
        function (e) {
            // Tabbing
            if (e.key === 'Tab') {
                // the "I am a keyboard user" key
                document.body.classList.add('user-is-tabbing');
            }
        },
        false
    );
};
