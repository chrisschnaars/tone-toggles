/************************************************
GLOBAL VARIABLES
************************************************/

// ACTIVE BEAT
var activeBeat = 1;
var numBeats = 8;

// GLOBAL PLAYING INDICATOR
var playing = false;

// TEMPO CONTROL
var tempoControl = document.querySelector("#tempo");
var bpm = Number(tempoControl.value);
var delay;  // TIMER FOR SET TIMEOUT

/************************************************
MAIN FUNCTIONALITY
************************************************/

// SETUP
window.onload = function() {
  // SETUP DOM AND INTERACTIVITY
  createToggles();
  setupInteraction();
  calcDelay();

  // SETUP AUDIO
  setupAudioPlayback();
};


/************************************************
HELPERS
************************************************/

// Calculate delay time given BPM
function calcDelay() {
  delay = 60000/bpm*4;
  // dleay = 60000/bpm;
}

// GET RANDOM NUMBER
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
