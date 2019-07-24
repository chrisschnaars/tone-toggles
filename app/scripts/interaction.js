/************************************************
INTERACTIVITY
************************************************/

// SETUP EVENT LISTENERS
function setupInteraction() {

  // TONE TOGGLE CLICK AND MOUSE EVENTS
  for (var i = 0; i < toneToggleDivs.length; i++) {

    // CLICK
    toneToggleDivs[i].addEventListener("click", function(e) {
      e.preventDefault();
      var id = e.target.getAttribute("id");
      toneToggles[id].toggle();
      checkPlaying();
    }, false);
  }

  // KEYBOARD EVENTS
  var keyCodes = ["a", "s", "d", "f", "j", "k", "l", ";"];
  document.addEventListener('keydown', function(e) {
    // PLAY TONES
    // Loop through keycodes to see if there's a match
    for (var i = 0; i < keyCodes.length; i++) {
      if (e.key.toLowerCase() === keyCodes[i]) {
        var id = keyCodes.indexOf(keyCodes[i]);
        toneToggles[id].toggle();
        checkPlaying();
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

  // PLAY/PAUSE BUTTON
  document.querySelector(".js-play-toggle").addEventListener('click', function(e){
    updatePlaying();
    e.target.blur();
  }, false);

  // KEY SELECTOR
  document.querySelector(".js-key-toggle").addEventListener('click', function(e){
    var k = Number(e.target.value);
    updateKey(k);
    updateToggleStatus(e);
    updateToggleDivs();
    e.target.blur();
  }, false);

  // MOBILE KEY SELECTOR
  document.querySelector(".js-key-selector-mini").addEventListener('click', function(e){
    k = null;
    updateKey(k);
    updateToggleDivs();
  }, false);

  // TEMPO SLIDER
  tempoControl.addEventListener("input", function() {
    bpm = Number(this.value);
    document.querySelector(".js-tempo-readout").innerHTML = this.value;
    tempoControl.setAttribute('aria-valuenow', bpm);
    tempoControl.setAttribute('value', bpm);
    calcDelay();
  }, false);

  // REFRESH BUTTON
  document.querySelector(".js-refresh-btn").addEventListener('click', function(e){
    for (var i = 0; i < numToggles; i++) {
      updateToggleRhythm(i);
    }
    e.target.blur();
  }, false);

  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector(".js-about-open-btn").addEventListener("click", function() {
    document.querySelector(".about").classList.add("about--visible");
  }, false);

  // CLOSE ABOUT TOGGLE
  document.querySelector(".js-about-close-btn").addEventListener("click", function() {
    document.querySelector(".about").classList.remove("about--visible");
  }, false);
}

/************************************************
TOGGLE GROUP UPDATES
************************************************/

// UPDATE TOGGLE BUTTON GROUP FOR ACTIVE SELECTION
function updateToggleStatus(e) {
  // REMOVE SELECTED CLASS FROM ALL TOGGLES
  var toggles = document.querySelectorAll(".btn--toggle");
  for (var i=0; i<toggles.length; i++) {
    toggles[i].classList.remove("btn--toggle-selected");
  }

  // ADD SELECTED CLASS TO SELECTED
  e.target.classList.add("btn--toggle-selected");
}
