'use strict';

var color = 'white';
var setBtn = document.menu.size;
var resetBtn = document.menu.reset;
var i = null;
var j = null;
var mouseActive = 0;
var colorInputs = document.menu.color;
var canvas = document.getElementById('canvas');

function changeMouseState() {
  if (mouseActive) {
    mouseActive = 0;
  } else {
    mouseActive = 1;
  }
}

function updateColor() {
  color = this.value;
}

function addColor(event) {
  if (mouseActive || event.type === 'mousedown') {
    this.className = '';
    this.classList.add(color);
  }
}

function getPixelSize() {
  return Number(document.getElementById('pixel-size').value);
}

function getCSSRule(ruleName, deleteFlag) {
  var cssRule;
  var styleSheet;
  if (document.styleSheets) {
    for (i = 0; i < document.styleSheets.length; i++) {
      styleSheet = document.styleSheets[i];
      j = 0;
      cssRule = false;
      do {
        if (styleSheet.cssRules) {
          cssRule = styleSheet.cssRules[j];
        } else {
          cssRule = styleSheet.rules[j];
        }
        if (cssRule) {
          if (cssRule.selectorText.toLowerCase() === ruleName) {
            if (deleteFlag === 'delete') {
              if (styleSheet.cssRules) {
                styleSheet.deleteRule(j);
              } else {
                styleSheet.removeRule(j);
              }
              return true;
            }
            return cssRule;
          }
        }
        j += 1;
      } while (cssRule);
    }
  }
  return false;
}

function drawDivs() {
  var width = 600 / getPixelSize();
  var height = 480 / getPixelSize();
  var fragment = document.createDocumentFragment();
  var element = null;

  for (i = 0; i < width * height; i += 1) {
    element = document.createElement('div');
    element.addEventListener('mouseenter', addColor);
    element.addEventListener('mousedown', addColor);
    fragment.appendChild(element);
  }

  canvas.appendChild(fragment);
}

function reset() {
  for (i = 0; i < canvas.childElementCount; i += 1) {
    canvas.children[i].className = '';
  }
}

function resize() {
  var pixelSize = getPixelSize();

  var divSize = getCSSRule('#canvas div');

  divSize.style.width = pixelSize + 'px';
  divSize.style.height = pixelSize + 'px';

  canvas.innerHTML = '';

  drawDivs();
}

function init() {
  drawDivs();
}

for (i = 0; i < colorInputs.length; i += 1) {
  colorInputs[i].addEventListener('click', updateColor);
}
document.addEventListener('mousedown', changeMouseState);
document.addEventListener('mouseup', changeMouseState);
resetBtn.addEventListener('click', reset);
setBtn.addEventListener('click', resize);

document.body.onload = init();
