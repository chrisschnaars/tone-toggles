var delay,activeBeat=1,numBeats=8,playing=!1,tempoControl=document.querySelector("#tempo"),bpm=Number(tempoControl.value);function calcDelay(){delay=6e4/bpm*4}function getRndInteger(e,t){return Math.floor(Math.random()*(t-e+1))+e}function setupInteraction(){for(var e=0;e<toneToggleDivs.length;e++)toneToggleDivs[e].addEventListener("click",function(e){e.preventDefault();var t=e.target.getAttribute("id");toneToggles[t].toggle(),checkPlaying()},!1);var n=["a","s","d","f","j","k","l",";"];document.addEventListener("keydown",function(e){for(var t=0;t<n.length;t++)if(e.key.toLowerCase()===n[t]){var o=n.indexOf(n[t]);toneToggles[o].toggle(),checkPlaying()}" "===e.key&&updatePlaying()},!1),document.querySelector("#play-toggle").addEventListener("click",function(e){updatePlaying()},!1),document.querySelector(".key-selector").addEventListener("click",function(e){updateKey(Number(e.target.value)),updateToggleStatus(e),updateToggleDivs()},!1),document.querySelector("#key-selector-mini").addEventListener("click",function(e){k=null,updateKey(k),updateToggleDivs()},!1),tempoControl.addEventListener("input",function(){bpm=Number(this.value),document.querySelector("#tempo-readout").innerHTML=this.value,calcDelay()},!1),document.querySelector("#about-modal-open").addEventListener("click",function(){document.querySelector("#about-modal").classList.add("visible")},!1),document.querySelector("#about-modal-close").addEventListener("click",function(){document.querySelector("#about-modal").classList.remove("visible")},!1)}function updateToggleStatus(e){for(var t=document.querySelectorAll(".toggle"),o=0;o<t.length;o++)t[o].classList.remove("selected");e.target.classList.add("selected")}window.onload=function(){createToggles(),setupInteraction(),calcDelay(),setupAudioPlayback()};var toneToggleDivs,toneToggles=[],numToggles=8;function createToggles(){createToggleObjects(),createToggleDivs(),updateToggleDivs()}function createToggleObjects(){for(var e=0;e<numToggles;e++)toneToggles[e]=new ToneToggle(e),updateToggleRhythm(e)}function createToggleDivs(){for(var e=document.querySelector("#main-container"),t=0;t<toneToggles.length;t++){var o=document.createElement("div");o.id=t,o.classList.add("tone-toggle","toggle"+t);var n=document.createElement("p");n.classList.add("note-display"),o.append(n),e.append(o)}toneToggleDivs=document.getElementsByClassName("tone-toggle")}function updateToggleDivs(){for(var e=document.querySelectorAll(".note-display"),t=0;t<toneToggles.length;t++){var o=toneToggles[t],n=scaleNotes[keyState][t];o.note=n,e[t].innerHTML=n;for(var a=0;a<scaleColors.length;a++)n==scaleColors[a][0]&&(o.color=scaleColors[a][1],o.active&&o.setBackground())}}function updateToggleRhythm(e){for(var t=[],o=0;o<numBeats;o++){var n=getRndInteger(0,2);t.push(n)}if(checkBeatValues(t))for(o=0;o<t.length;o++)t[o]<1?toneToggles[e].rhythm[o]=!0:toneToggles[e].rhythm[o]=!1;else updateToggleRhythm(e)}function checkBeatValues(e){for(var t=0;t<e.length;t++)if(e[t]<1)return!0;return!1}function ToneToggle(o){this.id=o,this.note=null,this.tone=scaleIntervals[o],this.color=null,this.active=!1,this.rhythm=[],this.toggle=function(){this.active?(this.active=!1,updateToggleRhythm(this.id)):this.active=!0,this.setBackground()},this.setBackground=function(){var e,t;this.active?(e=this.color,t="#FFFFFF"):e=t=null,toneToggleDivs[o].style.backgroundColor=e,toneToggleDivs[o].style.borderColor=e,toneToggleDivs[o].style.color=t},this.play=function(e){this.active&&this.rhythm[e-1]&&(playOsc(this.tone),this.expand(),setTimeout(this.contract,delay/(2*numBeats)))},this.expand=function(){var e="scale(0.985)";toneToggleDivs[o].style.webkitTransform=e,toneToggleDivs[o].style.MozTransform=e,toneToggleDivs[o].style.msTransform=e,toneToggleDivs[o].style.OTransform=e,toneToggleDivs[o].style.transform=e},this.contract=function(){var e="scale(1)";toneToggleDivs[o].style.webkitTransform=e,toneToggleDivs[o].style.MozTransform=e,toneToggleDivs[o].style.msTransform=e,toneToggleDivs[o].style.OTransform=e,toneToggleDivs[o].style.transform=e}}var osc,wave,masterGainNode,gainNode,timer,wavetableSource={real:[0,-1e-6,-.269882,.107057,-.002942,.013992,-.009736,.001942,-.005952,.00175,-.001294,.001534,-433e-6,.001327,-653e-6,677e-6,-264e-6,338e-6,-501e-6,94e-5,-752e-6,.001031,-.001881,812e-6,-.001156,.001026,-888e-6,871e-6,-757e-6,699e-6,-667e-6,617e-6,-607e-6,598e-6,-589e-6,599e-6,-628e-6,619e-6,-611e-6,603e-6,-596e-6,571e-6,-514e-6,478e-6,-473e-6,467e-6,-462e-6,457e-6,-452e-6,361e-6,-358e-6,354e-6,-351e-6,347e-6,-344e-6,341e-6,-338e-6,335e-6,-332e-6,25e-5,-248e-6,246e-6,-244e-6,242e-6,-24e-5,238e-6,-236e-6,234e-6,-233e-6,181e-6,-179e-6,178e-6,-177e-6,176e-6,-175e-6,173e-6,-172e-6,171e-6,-17e-5,169e-6,-168e-6,167e-6,-134e-6,133e-6,-132e-6,131e-6,-131e-6,13e-5,-129e-6,128e-6,-128e-6,127e-6,-126e-6,126e-6,-125e-6,124e-6,-124e-6,123e-6,-122e-6,122e-6,-121e-6,121e-6,-12e-5,119e-6,-119e-6,118e-6,-95e-6,94e-6,-94e-6,94e-6,-93e-6,93e-6,-92e-6,92e-6,-92e-6,91e-6,-91e-6,9e-5,-9e-5,9e-5,-89e-6,89e-6,-89e-6,88e-6,-88e-6,87e-6,-87e-6,87e-6,-86e-6,86e-6,-86e-6,85e-6,-85e-6,85e-6,-84e-6,84e-6,-84e-6,84e-6,-83e-6,83e-6,-78e-6,77e-6,-77e-6,77e-6,-77e-6,76e-6,-76e-6,76e-6,-76e-6,75e-6,-75e-6,75e-6,-75e-6,74e-6,-74e-6,74e-6,-74e-6,73e-6,-73e-6,73e-6,-73e-6,72e-6,-72e-6,72e-6,-72e-6,72e-6,-71e-6,71e-6,-71e-6,71e-6,-7e-5,7e-5,-7e-5,7e-5,-7e-5,69e-6,-69e-6,69e-6,-69e-6,69e-6,-69e-6,68e-6,-68e-6,68e-6,-68e-6,68e-6,-67e-6,67e-6,-67e-6,67e-6,-67e-6,66e-6,-66e-6,66e-6,-66e-6,66e-6,-66e-6,65e-6,-65e-6,65e-6,-65e-6,65e-6,-65e-6,64e-6,-64e-6,64e-6,-64e-6,64e-6,-64e-6,64e-6,-63e-6,63e-6,-63e-6,63e-6,-63e-6,63e-6,-62e-6,57e-6,-57e-6,57e-6,-56e-6,56e-6,-56e-6,56e-6,-56e-6,56e-6,-56e-6,56e-6,-55e-6,55e-6,-55e-6,55e-6,-55e-6,55e-6,-55e-6,55e-6,-54e-6,54e-6,-54e-6,54e-6,-54e-6,54e-6,-54e-6,54e-6,-54e-6,53e-6,-53e-6,53e-6,-53e-6,53e-6,-53e-6,53e-6,-53e-6,53e-6,-52e-6,52e-6,-52e-6,52e-6,-52e-6,52e-6,-52e-6,52e-6,-52e-6,52e-6,-51e-6,51e-6,-51e-6,51e-6,-51e-6,51e-6,-51e-6,51e-6,-51e-6,51e-6,-5e-5,5e-5,-5e-5,5e-5,-5e-5,5e-5,-5e-5,5e-5,-5e-5,5e-5,-49e-6,49e-6,-49e-6,49e-6,-49e-6,49e-6,-49e-6,49e-6,-49e-6,49e-6,-49e-6,48e-6,-48e-6,48e-6,-48e-6,48e-6,-48e-6,48e-6,-48e-6,48e-6,-48e-6,48e-6,-48e-6,47e-6,-47e-6,47e-6,-47e-6,47e-6,-47e-6,47e-6,-47e-6,47e-6,-47e-6,47e-6,-47e-6,46e-6,-46e-6,46e-6,-46e-6,46e-6,-46e-6,46e-6,-46e-6,46e-6,-46e-6,46e-6,-46e-6,46e-6,-45e-6,45e-6,-45e-6,45e-6,-45e-6,45e-6,-45e-6,45e-6,-45e-6,45e-6,-45e-6,45e-6,-45e-6,45e-6,-44e-6,44e-6,-44e-6,44e-6,-44e-6,44e-6,-44e-6,44e-6,-44e-6,44e-6,-44e-6,44e-6,-44e-6,44e-6,-43e-6,43e-6,-43e-6,34e-6,-34e-6,34e-6,-34e-6,34e-6,-34e-6,34e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,33e-6,-33e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,32e-6,-32e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-31e-6,31e-6,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-3e-5,3e-5,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,29e-6,-29e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,28e-6,-28e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,27e-6,-27e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-26e-6,26e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,25e-6,-25e-6,22e-6,-22e-6,22e-6,-22e-6,22e-6,-22e-6,22e-6,-22e-6,22e-6,-22e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,21e-6,-21e-6,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-2e-5,2e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6],imag:[0,.5,-2e-6,1e-6,-0,1e-6,-1e-6,0,-1e-6,0,-0,0,-0,0,-0,0,-0,0,-0,1e-6,-0,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,2e-6,-2e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,4e-6,-4e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,9e-6,-9e-6,9e-6,-9e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,8e-6,-8e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,9e-6,-9e-6,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-1e-5,1e-5,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-13e-6,13e-6,-13e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-11e-6,11e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-12e-6,12e-6,-13e-6,13e-6,-13e-6,13e-6,-13e-6,13e-6,-13e-6,13e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-6e-6,6e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-7e-6,7e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,5e-6,-5e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,3e-6,-3e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,2e-6,-2e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-1e-6,1e-6,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0,0,-0]},wavetable={real:Float32Array.from(wavetableSource.real),imag:Float32Array.from(wavetableSource.imag)},keyState=0,keyFrequencies=[110,130.81,146.83,164.81,207.65],keyRootNotes=["A","C","D","E","G#"],scaleIntervals=[1,5/4,4/3,15/8,2,2.5,4/3*2,3],chromaticScale=["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"],key=keyFrequencies[0],scaleNotes=[["A","C&#9839;","E","G&#9839;","A","D","F&#9839;","A"],["C","D","E","F","G","A","B","C"],["D","E","F&#9839;","G","A","B","C&#9839;","D"],["E","F&#9839;","G&#9839;","A","B","C&#9839;","D&#9839;","E"],["G&#9839;","A&#9839;","B&#9839;","C&#9839;","D&#9839;","E&#9839;","F","G&#9839;"]],scaleColors=[["A","#DC312E"],["A&#9839;","#E3682F"],["B","#E6822C"],["B&#9839;","#F5CC00"],["C","#F5CC00"],["C&#9839;","#39E14F"],["D","#19CC67"],["D&#9839;","#1FDBCC"],["E","#10A3D4"],["F","#6700FF"],["F&#9839;","#A620D2"],["G","#CB1DCB"],["G&#9839;","#D92170"]],AudioContext=window.AudioContext||window.webkitAudioContext,audioCtx=new AudioContext,toneLength=3,gainValue=1;function setupAudioPlayback(){setupMasterGain(),initOsc()}function setupMasterGain(){(masterGainNode=audioCtx.createGain()).connect(audioCtx.destination),masterGainNode.gain.value=gainValue}function initOsc(){wave=audioCtx.createPeriodicWave(wavetable.real,wavetable.imag),(osc=audioCtx.createOscillator()).setPeriodicWave(wave),gainNode=audioCtx.createGain(),osc.connect(gainNode),gainNode.connect(masterGainNode)}function playOsc(e){initOsc();var t=audioCtx.currentTime;osc.frequency.value=e*key,gainNode.gain.setValueAtTime(gainValue,t),osc.start(t),stopOsc(t),playing=!0}function stopOsc(e){gainNode.gain.exponentialRampToValueAtTime(.001,e+toneLength),osc.stop(e+toneLength),playing=!1}function playTones(){timer=setTimeout(function e(){for(var t=0;t<toneToggles.length;t++)toneToggles[t].play(activeBeat);timer=setTimeout(e,delay/numBeats),numBeats<++activeBeat&&(activeBeat=1)})}function stopTones(){clearTimeout(timer)}function checkPlaying(){(playing||updatePlaying(),playing)&&(allInactive()&&updatePlaying())}function allInactive(){for(var e=0;e<toneToggles.length;e++)if(1==toneToggles[e].active)return!1;return!0}function updatePlaying(){var e=document.querySelector("#play-toggle");playing=playing?(stopTones(),e.classList.remove("pause-btn"),e.classList.add("play-btn"),!1):(playTones(),e.classList.remove("play-btn"),e.classList.add("pause-btn"),!0)}function updateKey(e){window.innerWidth<=600?(key=keyFrequencies[keyState],++keyState>keyFrequencies.length-1&&(keyState=0),document.querySelector("#key-selector-mini").innerHTML=keyRootNotes[keyState]):(key=keyFrequencies[e],keyState=e)}