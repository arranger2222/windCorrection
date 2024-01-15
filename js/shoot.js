const horizontalArrow = document.querySelector('.horizontal > img');
const verticalArrow = document.querySelector('.vertical > img');
const leftRightContent = document.querySelector('.left-right');
const answerText = document.querySelector('.answer-message');
const upDownContent = document.querySelector('.up-down');
const randomBtn = document.querySelector('.random');
const vRadio = document.querySelectorAll('.vRadio');
const hRadio = document.querySelectorAll('.hRadio');
const form = document.querySelector('.form-shoot');
const scaleV = document.querySelector('.scale-v');
const scaleH = document.querySelector('.scale-h');
const vInput = document.getElementById('vInput');
const hInput = document.getElementById('hInput');
const hit = document.querySelector('.hit');

let leftOrRight = false;
let clockwiseH = true;
let scaleValueH = '';
let milsH = 0;
let clicksH = 0;
let directToTurnH = '';

let clockwiseV = true;
let upOrDown = false;
let scaleValueV = '';
let milsV = 0;
let clicksV = 0;
let directToTurnV = '';

let vRadioValue = null;
let hRadioValue = null;
let vInputValue = null;
let hInputValue = null;
let message = '';

let coordX = 0;
let coordY = 0;

form.addEventListener('submit', submitHandler);
randomBtn.addEventListener('click', randomHandler);

function getFormData() {
  event.preventDefault();

  vRadioValue = Array.from(vRadio).find(radio => radio.checked)?.value;
  hRadioValue = Array.from(hRadio).find(radio => radio.checked)?.value;

  // vRadioValue = vRadio.checked ? vRadio.value : null;
  // hRadioValue = hRadio.checked ? hRadio.value : null;

  vInputValue = vInput.value;
  hInputValue = hInput.value;

  console.log(vRadioValue);
  console.log(hRadioValue);
  console.log(vInputValue);
  console.log(hInputValue);
}

const coords = [-100, -82, -66, -50, -32, -16, 0, 16, 32, 50, 66, 82, 100];
// const coords = [-100, -66, -32, 0, 32, 66, 100];
const scaleValues = ['0.1 MRAD', '0.5 ТИС', '1/4 MOA', '1/8 MOA'];
const objToVisible = {
  leftRightContent,
  horizontalArrow,
  upDownContent,
  verticalArrow,
  scaleV,
  scaleH,
  hit,
};

function submitHandler() {
  event.preventDefault();

  directToTurnV = calculateVerticalTurn();
  directToTurnH = calculateHorizontalTurn();
  getFormData();
  clearForm();

  if (
    directToTurnV === vRadioValue &&
    directToTurnH === hRadioValue &&
    vInputValue == clicksV &&
    hInputValue == clicksH
  ) {
    message = 'answer right!!!';
    answerText.classList.add('correct');
    answerText.classList.remove('wrong');
    console.log('answer right!!!');
  } else {
    message = 'answer wrong!';
    console.log('answer wrong!');
    answerText.classList.add('wrong');
    answerText.classList.remove('correct');
  }

  answerText.textContent = message;
}

function randomHandler() {
  moveShoot();
  clockwiseH = getRandomBoolean();
  clockwiseV = getRandomBoolean();
  isClockwise(clockwiseH, horizontalArrow);
  isClockwise(clockwiseV, verticalArrow);

  scaleValueH = getScaleValue(scaleH);
  scaleValueV = getScaleValue(scaleV);
  clicksH = calculateClicks(milsH, scaleValues.indexOf(scaleValueH));
  clicksV = calculateClicks(milsV, scaleValues.indexOf(scaleValueV));
  // console.log('horizontal', { clicksH, clockwiseH });
  // console.log('vertical', { clicksV, clockwiseV });

  // console.log(scaleValueH);
  // console.log(scaleValueV);

  isLeftOrRight();
  isUpOrDown();

  doVisible(objToVisible);
}

// function checkAnswer(){

// }

function moveShoot() {
  coordX = getRandomValue(0, 12);
  coordY = getRandomValue(0, 12);
  if (coordX === 6 && coordY === 6) {
    coordX = getRandomValue(0, 12);
    coordY = getRandomValue(0, 12);
  }
  milsH = getMilsFromCoords(coords[coordX]);
  milsV = getMilsFromCoords(coords[coordY]);

  // console.log('milsH', milsH);
  // console.log('milsV', milsV);
  // console.log('X', coords[coordX]);
  // console.log('Y', coords[coordY]);
  hit.style.transform = `translate(${coords[coordX]}px, ${coords[coordY]}px )`;
}

function isClockwise(param, element) {
  return param
    ? element.classList.remove('flipped')
    : element.classList.add('flipped');
}

function isLeftOrRight() {
  leftOrRight = getRandomBoolean();
  return leftOrRight
    ? (leftRightContent.textContent = 'L')
    : (leftRightContent.textContent = 'R');
}

function isUpOrDown() {
  upOrDown = getRandomBoolean();
  return upOrDown
    ? (upDownContent.textContent = 'U')
    : (upDownContent.textContent = 'D');
}

function getScaleValue(element) {
  const value = getRandomValue(0, 3);
  element.textContent = scaleValues[value];
  return scaleValues[value];
}

function doVisible(obj) {
  const keys = Object.keys(obj);
  keys.map(key => {
    obj[key].classList.remove('hidden');
  });
}

const getMilsFromCoords = function (value) {
  let range = 0;
  switch (value) {
    case 16:
    case -16:
      range = 0.5;
      break;

    case 32:
    case -32:
      range = 1;
      break;

    case -50:
    case 50:
      range = 1.5;
      break;

    case -66:
    case 66:
      range = 2;
      break;

    case -82:
    case 82:
      range = 2.5;
      break;

    case -100:
    case 100:
      range = 3;
      break;

    default:
      0;
      break;
  }
  return range;
};

function calculateClicks(range, units) {
  let quantity = 0;
  // console.log('range', range);
  // console.log('units', units);
  switch (units) {
    case 0:
      quantity = range * 10;
      break;
    case 1:
      quantity = range * 2;
      break;
    case 2:
      quantity = range * 14;
      break;
    case 3:
      quantity = range * 28;
      break;
    default:
      range;
  }
  return quantity;
}

function calculateVerticalTurn() {
  event.preventDefault();
  let vTurn = '';
  if (upDownContent.textContent === 'U' && clockwiseV && coords[coordY] > 0) {
    directToTurnV = 'right';
  } else if (
    upDownContent.textContent === 'D' &&
    clockwiseV &&
    coords[coordY] < 0
  ) {
    vTurn = 'right';
  } else if (
    upDownContent.textContent === 'U' &&
    !clockwiseV &&
    coords[coordY] < 0
  ) {
    vTurn = 'right';
  } else if (coords[coordY] === 0) {
    vTurn = 'center';
  } else {
    vTurn = 'left';
  }

  return vTurn;
}

function calculateHorizontalTurn() {
  event.preventDefault();
  let hTurn = '';
  if (
    leftRightContent.textContent === 'R' &&
    clockwiseH &&
    coords[coordX] < 0
  ) {
    hTurn = 'right';
  } else if (
    leftRightContent.textContent === 'R' &&
    !clockwiseH &&
    coords[coordX] > 0
  ) {
    hTurn = 'right';
  } else if (
    leftRightContent.textContent === 'L' &&
    clockwiseH &&
    coords[coordX] > 0
  ) {
    hTurn = 'right';
  } else if (
    leftRightContent.textContent === 'L' &&
    !clockwiseH &&
    coords[coordX] < 0
  ) {
    hTurn = 'right';
  } else if (coords[coordX] === 0) {
    hTurn = 'center';
  } else {
    hTurn = 'left';
  }

  return hTurn;
}

function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}

function clearForm() {
  form.reset();
}
