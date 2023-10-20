const displayElement = document.querySelector(".display");
let displayValue = "";
let particleCount = 400;
const defaults = {
  origin: { y: 0.7 }
};

/**
 * Generates an explosion-like effect with confetti particles.
 *
 * @param {number} particleRatio - The ratio of particles to generate.
 * @param {object} opts - Optional configuration options.
 * @return {undefined} This function does not return a value.
 */
function fire(particleRatio, opts) {
  confetti(Object.assign({}, defaults, opts, {
    particleCount: Math.floor(particleCount * particleRatio)
  }));
}

$(function() {
  $("button").click((e) => {
    let target = e.target;
    let dataId = $(target).attr("data-id");
    if(displayValue.toString()=="NaN"){
      displayValue = "0";
    }
    if (check(dataId)) {
      displayValue += dataId;
      displayElement.innerHTML = displayValue;
    }

    switch (dataId) {
      case "clear":
        blink();
        displayValue = "0";
        break;
      case "+":
      case "-":
      case "/":
      case "*":
        displayValue += dataId;
        displayElement.innerHTML = displayValue;
        break;
      case "sqrt":
        displayValue = Math.sqrt(eval(displayValue)) + "";
        blink(displayValue.substring(0, 11));
        break;
      case "pow2":
        displayValue = Math.pow(eval(displayValue), 2) + "";
        blink(displayValue.substring(0, 25));
        break;
      case "eval":
        displayValue = eval(displayValue) + "";
        blink(displayValue.substring(0, 11));
        break;
      case "explode":
        window.close();
    }
  });
});

/**
 * Basic checks
 * 
 * @param {Number} n
 * @returns {boolean}
 */
let _c = 0;
function check(n = 0) {
  if (n == 0 && displayValue.slice(-1) == "0") {
    return false;
  } else if (displayValue.length > 10) {
    if (!isNaN(n)) {
      _c++;
      if (_c >= 3) {
        _c = 0;
      }
    }
    return false;
  } else if (isNaN(n)) {
    return false;
  }

  if (displayValue.length == 1 && displayValue.slice(-1) == "0") {
    displayValue = "";
  }

  return true;
}

/**
 * Blinks the display for a split second
 * 
 */
function blink() {
  displayElement.innerHTML = "&nbsp;";
  setTimeout(() => {
    displayElement.innerHTML = displayValue;
  }, 100);
}