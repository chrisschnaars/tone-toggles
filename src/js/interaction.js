/************************************************
INTERACTIVITY
************************************************/

// SETUP ALL EVENT LISTENERS
function setupInteraction() {

  // TONE TOGGLES CLICK EVENT
  for (var i = 0; i < toneToggleDivs.length; i++) {

    toneToggleDivs[i].addEventListener("click", function(e) {
      e.preventDefault();
      var id = e.target.getAttribute("id");
      toneToggles[id].toggle();
      checkPlaying();
    }, false);
  }

  // PLAY/PAUSE BUTTON CLICK
  document.querySelector(".js-play-toggle").addEventListener('click', function(e){
    updatePlaying();
    e.target.blur();
  }, false);

  // KEY SELECTOR CLICK
  document.querySelector(".js-key-toggle").addEventListener('click', function(e){
    var k = Number(e.target.value);
    updateKey(k);
    updateToggleStatus(k);
    updateToggleDivs();
    e.target.blur();
  }, false);

  // MOBILE KEY SELECTOR CLICK/TAP
  document.querySelector(".js-key-selector-mini").addEventListener('click', function(e){
    k = null;
    updateKey(k);
    updateToggleDivs();
  }, false);

  // TEMPO SLIDER CHANGE
  tempoControl.addEventListener("input", function() {
    bpm = Number(this.value);
    document.querySelector(".js-tempo-readout").innerHTML = this.value;
    tempoControl.setAttribute('aria-valuenow', bpm);
    tempoControl.setAttribute('value', bpm);
    calcDelay();
  }, false);

  // REFRESH BUTTON CLICK
  document.querySelector(".js-refresh-btn").addEventListener('click', function(e){
    for (var i = 0; i < numToggles; i++) {
      updateToggleRhythm(i);
    }
    e.target.blur();
  }, false);

  // SHOW ABOUT MODAL CLICK
  document.querySelector(".js-about-open-btn").addEventListener("click", function() {
    document.querySelector(".about").classList.add("about--visible");
  }, false);

  // CLOSE ABOUT TOGGLE CLICK
  document.querySelector(".js-about-close-btn").addEventListener("click", function() {
    document.querySelector(".about").classList.remove("about--visible");
  }, false);



  /*
  **  KEYBOARD EVENTS
  */

  document.addEventListener('keydown', function(e) {

    // PLAY TONES
    var toggleKeyCodes = [ "a", "s", "d", "f", "j", "k", "l", ";" ];
    for (var i = 0; i < toggleKeyCodes.length; i++) {
      if (e.key.toLowerCase() === toggleKeyCodes[i]) {
        var id = toggleKeyCodes.indexOf(toggleKeyCodes[i]);
        toneToggles[id].toggle();
        checkPlaying();
      }
    }

    // CHANGE KEYS
    var keyKeyCodes = [ "1", "2", "3", "4", "5" ];
    for (var i=0; i < keyKeyCodes.length; i++) {
      if (e.key  === keyKeyCodes[i]) {
        var id = keyKeyCodes.indexOf(keyKeyCodes[i]);
        updateKey(id);
        updateToggleStatus(id);
        updateToggleDivs();
      }
    }

    // MUTE/UNMUTE
    if (e.key === ' ' ) {
      updatePlaying();
    }

    // TABBING
    if (e.key === 'Tab') { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        // window.removeEventListener('keydown', handleFirstTab);
    }
  }, false);
}

/************************************************
TOGGLE GROUP UPDATES
************************************************/

// UPDATE TOGGLE BUTTON GROUP FOR ACTIVE SELECTION
function updateToggleStatus(id) {
  // REMOVE SELECTED CLASS FROM ALL TOGGLES
  var toggles = document.querySelectorAll(".btn--toggle");

  for (var i=0; i<toggles.length; i++) {
    toggles[i].classList.remove("btn--toggle-selected");
  }

  // ADD SELECTED CLASS TO SELECTED
  toggles[id].classList.add("btn--toggle-selected");
}
