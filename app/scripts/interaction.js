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
        // console.log(id);
        toneToggles[id].toggle();
        checkPlaying();
      }
    }

    // MUTE/UNMUTE
    if (e.key === ' ' ) {
      updatePlaying();
    }
  }, false);

  // PLAY/PAUSE BUTTON
  document.querySelector("#play-toggle").addEventListener('click', function(e){
    updatePlaying();
  }, false);

  // KEY SELECTOR
  document.querySelector('.key-selector').addEventListener('click', function(e){
    var k = Number(e.target.value);
    updateKey(k);
    updateToggleStatus(e);
    updateToggleDivs();
  }, false);

  // MOBILE KEY SELECTOR
  document.querySelector("#key-selector-mini").addEventListener('click', function(e){
    k = null;
    updateKey(k);
    updateToggleDivs();
  }, false);

  // TEMPO SLIDER
  tempoControl.addEventListener("input", function() {
    bpm = Number(this.value);
    document.querySelector("#tempo-readout").innerHTML = this.value;
    calcDelay();
    // console.log(bpm);
  }, false);

  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector("#about-modal-open").addEventListener("click", function() {
    document.querySelector("#about-modal").classList.add("visible");
  }, false);

  // CLOSE ABOUT TOGGLE
  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector("#about-modal-close").addEventListener("click", function() {
    document.querySelector("#about-modal").classList.remove("visible");
  }, false);
}

/************************************************
TOGGLE GROUP UPDATES
************************************************/

// UPDATE TOGGLE BUTTON GROUP FOR ACTIVE SELECTION
function updateToggleStatus(e) {
  // REMOVE SELECTED CLASS FROM ALL TOGGLES
  var toggles = document.querySelectorAll('.toggle');
  for (var i=0; i<toggles.length; i++) {
    toggles[i].classList.remove('selected');
  }

  // ADD SELECTED CLASS TO SELECTED
  e.target.classList.add( "selected" );
}
