/************************************************
TOGGLE SETTINGS
************************************************/

// TONE TOGGLES
var toneToggles = []; // object array
var numToggles = 8; // number of tone toggles
var toneToggleDivs;

// CREATE TOGGLES
function createToggles() {
  createToggleObjects();
  createToggleDivs();
  updateToggleDivs();
}

// INITIALIZE TONE TOGGLE OBJECTS
function createToggleObjects() {
  for (var i = 0; i < numToggles; i++) {
    toneToggles[i] = new ToneToggle(i);
    updateToggleRhythm(i);
  }
}

// SETUP TONE TOGGLE DIVS
function createToggleDivs() {
  // TOGGLE CONTAINER DIV
  var pD = document.querySelector('.main-container');

  // CREATE A DIV FOR EACH TOGGLE
  for (var i = 0; i < toneToggles.length; i++) {

    // CREATE TONE TOGGLE DIV ELEMENT
    var t = document.createElement('div');
    t.id = i; // add id
    t.classList.add('tone-toggle', 'toggle' + i); // add tone-toggle class

    // ADD NOTE DISPLAY ELEMENT
    var p = document.createElement('p');
    p.classList.add('tone-toggle_note-display');
    t.append(p);

    // APPEND TO TOGGLE CONTAINER
    pD.append(t); // add to parent div
  }

  // SET TOGGLE DIVS VARIABLE
  toneToggleDivs = document.getElementsByClassName('tone-toggle');
}

// UPDATE TOGGLE DIVS FOR NEW KEYS
function updateToggleDivs() {
  // GET ARRAY OF ALL TOGGLE NOTE DISPLAYS
  var noteDisplayArray = document.querySelectorAll('.tone-toggle_note-display');

  // UPDATE TOGGLE NOTE AND NOTE DISPLAY TEXT BASED ON KEY
  for (var i = 0; i < toneToggles.length; i++) {

    // TOGGLE VARIABLE
    var tt = toneToggles[i];

    // FIND AND SET toggle NOTE
    var n = scaleNotes[keyState][i];
    tt.note = n;
    noteDisplayArray[i].innerHTML = n;

    // DETERMINE TOGGLE COLOR
    for (var j = 0; j < scaleColors.length; j++) {
      if (n == scaleColors[j][0]) {
        tt.color = scaleColors[j][1];
        // TOGGLE BACKGROUND ON IF TOGGLE IS ACTIVE
        if (tt.active) {
          tt.setBackground();
        }
      }
    }
  }
}

// SET EACH TOGGLES RHYTHM PATTERN
function updateToggleRhythm(toggleId) {

  // GENERATE RANDOM VARIABLES FOR RHYTHM FLAGS
  var b = [];
  for (var i = 0; i < numBeats; i++) {
    var v = getRndInteger(0, 2);
    b.push(v);
  }

  // CHECK TO SEE THERE'S AT LEAST ONE ACTIVE BEAT
  var c = checkBeatValues(b);

  // SET TONE TOGGLE RHYTHM FLAGS
  if (c) {
    for (var i=0; i<b.length; i++) {
      if (b[i] < 1) {
        toneToggles[toggleId].rhythm[i] = true;
      } else {
        toneToggles[toggleId].rhythm[i] = false;
      }
    }
  } else {
    updateToggleRhythm(toggleId);
  }
}

// CHECK TO MAKE SURE THERE'S ONE ACTIVE BEAT
function checkBeatValues(a) {
  for (var i = 0; i<a.length; i++) {
    if (a[i] < 1) {
      return true;
    }
  }

  return false;
}

/************************************************
TOGGLE OBJECT
************************************************/

// TONE OBJECT
function ToneToggle(id) {
  this.id = id;
  this.note = null;  // note string to display on toggle
  this.tone = scaleIntervals[id]; // FREQUENCY TO PLAY
  this.color = null; // color of active state
  this.active = false;
  this.rhythm = [];

  this.animate = function(waitTime) {
    this.active = true;
    this.setBackground();
    this.active=false;
    setTimeout(this.setBackground, waitTime);
  }

  // Toggle between on/off states
  this.toggle = function() {

    // TOGGLE ACTIVE FLAG
    if (this.active) {
      this.active = false;
      updateToggleRhythm(this.id);
    } else {
      this.active = true;
    }

    // SET BG STYLE PROPERTIES
    this.setBackground();
  };

  // TOGGLE BETWEEN BACKGROUND STYLES
  this.setBackground = function() {
    var s1, s2;

    if (this.active) {
      s1 = this.color;
      s2 = "#FFFFFF";
    } else {
      s1 = s2 = null;
    }
    toneToggleDivs[id].style.backgroundColor = s1;
    toneToggleDivs[id].style.borderColor = s1;
    toneToggleDivs[id].style.color = s2;
  };

  // PLAY TONE
  this.play = function(beat) {
    if (this.active && this.rhythm[beat-1]) {
      // PLAY OSCILLATOR
      playOsc(this.tone);
      // EXPAND DIV
      this.expand();
      setTimeout(this.contract, delay/(numBeats*2));
    }
  };

  // EXPAND AND CONTRACT TOGGLE
  this.expand = function() {
    var transfromString = ('scale(0.985)');
    toneToggleDivs[id].style.webkitTransform = transfromString;
    toneToggleDivs[id].style.MozTransform = transfromString;
    toneToggleDivs[id].style.msTransform = transfromString;
    toneToggleDivs[id].style.OTransform = transfromString;
    toneToggleDivs[id].style.transform = transfromString;
  };

  // Contract Tone Toggle
  this.contract= function() {
    var transfromString = ('scale(1)');
    toneToggleDivs[id].style.webkitTransform = transfromString;
    toneToggleDivs[id].style.MozTransform = transfromString;
    toneToggleDivs[id].style.msTransform = transfromString;
    toneToggleDivs[id].style.OTransform = transfromString;
    toneToggleDivs[id].style.transform = transfromString;
  };
}
