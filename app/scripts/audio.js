/************************************************
TONE AND KEY SETUP
************************************************/

// KEY ID
var keyState = 0;

// ROOT FREQUENCY FOR KEYS
var keyFrequencies = [ 110, 130.81, 146.83, 164.81, 207.65 ];
var keyRootNotes = [ "A", "C", "D", "E", "G#" ];

// INTERVAL FOR EACH NOTE OF THE SCALE
// ROOT, THIRD, FIFTH, 1 OCTAVE, MINOR THIRD, PERF FOURTH, SEVENTH, 2 OCTAVE
var scaleIntervals = [1, 5/4, 3/2, 2, ((6/5)*2), ((4/3)*2), ((7/4)*2), 3];

// CHROMATIC
var chromaticScale = [ "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

// INITIAL KEY SETTINGS
var key = keyFrequencies[0];  // root frequency

// SCALE SETTINGS
/*
  Scales:
  A Major: A, B, C#, D, E, F#, G#
  C Major: C, D, E, F, G, A, B
  D Major: D, E, F#, G, A, B, C#
  E Major: E, F#, G#, A, B, C#, D#
  G# Major: G#, A#, B#, C#, D#, E#, F
*/

// var scaleNotes = [
//   [ 0, 4, 7, 11, 0, 5, 9, 1 ],
//   [ 3, 5, 7, 8, 10, 0, 2, 4 ],
//   [ 5, 7, 9, 10, 0, 2, 4, 5 ],
//   [ 7, 9, 11, 0, 2, 4, 6, 7 ],
//   [ 11, 1, ]
//   [ "G#", "A#", "B#", "C#", "D#", "E#", "F", "G#" ]
// ]

// ARRAY OF NOTES FOR EACH KEY
// ROOT, THIRD, FIFTH, 1 OCTAVE, MINOR THIRD, PERF FOURTH, SEVENTH, 2 OCTAVE
var scaleNotes = [
  [ "A", "C&#9839;", "E", "A", "C", "D", "G&#9839;", "A" ],
  [ "C", "E", "G", "C", "E&#9837;", "F", "B", "C" ],
  [ "D", "F&#9839;", "G", "D", "F", "G", "C&#9839;", "D" ],
  [ "E", "G&#9839;", "B", "E", "G", "A", "D&#9839;", "E" ],
  [ "G&#9839;", "B&#9839;", "D&#9839;", "G&#9839;", "B", "C&#9839;", "F", "G&#9839;" ]
];

// COLOR OF EACH NOTE
var scaleColors = [
  [ "A", "#DC312E" ],
  [ "A&#9839;", "#E3682F" ],
  [ "B&#9837;", "#E3682F" ],
  [ "B", "#E6822C" ],
  [ "B&#9839;", "#F5CC00" ],
  [ "C", "#F5CC00" ],
  [ "C&#9839;", "#39E14F" ],
  [ "D", "#19CC67" ],
  [ "D&#9839;", "#1FDBCC" ],
  [ "E&#9837;", "#1FDBCC" ],
  [ "E", "#10A3D4" ],
  [ "F", "#6700FF" ],
  [ "F&#9839;", "#A620D2" ],
  [ "G", "#CB1DCB" ],
  [ "G&#9839;", "#D92170" ]
];

/************************************************
OSCILLATOR SETUP
************************************************/

// Create Audio Context
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

// OSCILLATOR
var osc;
var wave;

// GAIN
var masterGainNode;
var gainNode;

// TONE SETTINGS
var toneLength = 3;
var gainValue = 1;

// SETUP AUDIO
function setupAudioPlayback() {
  setupMasterGain();  // set master gain
  initOsc();  // initialize oscillators
  // playTones();  // start playback counter
}

// MASTER GAIN VALUE FOR ALL OSCILLATORS
function setupMasterGain() {
  // Master Gain
  masterGainNode = audioCtx.createGain();
  masterGainNode.connect(audioCtx.destination);
  masterGainNode.gain.value = gainValue;
}

// INITIALIZE OSCILLATOR
function initOsc() {
  // Setup Wave
  wave = audioCtx.createPeriodicWave(wavetable.real, wavetable.imag);

  // Oscillator
  osc = audioCtx.createOscillator();
  osc.setPeriodicWave(wave);

  // Gain Node
  gainNode = audioCtx.createGain();

  // Connect Oscillator tp Gain, Gain to Destination
  osc.connect(gainNode);
  gainNode.connect(masterGainNode);
}

// START OSCILLATORS
function playOsc(freq) {
  // Re-initialize Oscillator
  initOsc();

  // Configure Osc
  var time = audioCtx.currentTime;
  osc.frequency.value = freq * key;
  gainNode.gain.setValueAtTime(gainValue, time);

  // Play
  osc.start(time);
  stopOsc(time);
  playing = true;
}

// STOP OSCILLATORS
function stopOsc(time) {
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + toneLength);
  osc.stop(time + toneLength);
  playing = false;
}

// **************************************
// PLAY TONE
// **************************************

// PLAY TIMER
var timer;

// PLAY TONE TO THE RUNNING TIMER
// This is used for the toggle on/off when clicked
function playTones() {
  timer = setTimeout(function myTimer() {
    // TONE TOGGLE PLAY FUNCTION
    for (var i=0; i<toneToggles.length;i++) {
      toneToggles[i].play(activeBeat);
    }
    // REST TIMER
    timer = setTimeout(myTimer, delay/numBeats);

    // INCREMENT ACTIVE BEAT
    activeBeat++;
    if (activeBeat > numBeats) {
      activeBeat = 1;
    }

  });
}

// STOP TONES PLAYING
function stopTones() {
  clearTimeout(timer);
}

// **************************************
// PLAYBACK CONTROLS
// **************************************

// CHECK TO SEE IF TOGGLES ARE PLAYING WHEN
// A TOGGLE IS CLICKED ON. IF NOT, START PLAYING.
// CHECK ALSO TO SEE IF ANY TOGGLES ARE ACTIVE WHEN PLAYING
// IF NONE ARE ACTIVE, PAUSE PLAYBACK
function checkPlaying() {
  // START PLAYBACK WHEN FIRST TOGGLE IS CLICKED
  if (!playing) {
    updatePlaying();
  }

  // STOP PLAYBACK WHEN NO TOGGLES ARE ON
  if (playing) {
    var p = allInactive();
    if (p) {
      updatePlaying();
    }
  }
}

// CHECK TO SEE IF ANY TOGGLES ARE ACTIVE
// IF NONE ARE ACTIVE, PAUSE PLAYBACK
function allInactive() {
  // CHECK ALL TOGGLES
  // RETURN FALSE IF ANY ARE ACTIVE
  for (var i=0; i < toneToggles.length; i++) {
    if (toneToggles[i].active == true) {
      return false;
    }
  }

  // IF NONE ACTIVE RETURN TRUE
  return true;
}

// TOGGLE PLAYING
function updatePlaying() {
  // PLAY TOGGLE DOM ELEMENT
  var playToggle = document.querySelector(".js-play-toggle");

  // TOGGLE PLAYING
  if (playing) {
    // STOP OSCILLATORS
    stopTones();
    // Update Button State
    playToggle.classList.remove("btn--pause");
    playToggle.classList.add("btn--play");
    // Update boolean
    playing = false;
  } else {
    // START OSCILLATORS
    playTones();
    // Update Button State
    playToggle.classList.remove("btn--play");
    playToggle.classList.add("btn--pause");
    // Update boolean
    playing = true;
  }
}

// UPDATE KEY
function updateKey(k) {
  var s = window.innerWidth;

  if (s <= 600) {
    // ADJUST KEY STATE
    keyState++;
    if (keyState > keyFrequencies.length - 1) {
      keyState = 0;
    }

    // SET KEY
    key = keyFrequencies[keyState];

    // UPDATE BUTTON LABEL
    document.querySelector(".js-key-selector-mini").innerHTML = keyRootNotes[keyState];

  } else {
    key = keyFrequencies[k];
    keyState = k;

    // UPDATE BUTTON LABEL
    document.querySelector(".js-key-selector-mini").innerHTML = keyRootNotes[keyState];

  }


}
