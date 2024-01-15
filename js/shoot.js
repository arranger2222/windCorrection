const randomBtn = document.querySelector('.random');
const hit = document.querySelector('.hit');
const leftRightContent = document.querySelector('.left-right');
const upDownContent = document.querySelector('.up-down');
const scaleV = document.querySelector('.scale-v');
const scaleH = document.querySelector('.scale-h');
const verticalArrow = document.querySelector('.vertical > img');
const horizontalArrow = document.querySelector('.horizontal > img');
const submit = document.querySelector('.submit');

let leftOrRight = false;
let clockwiseH = true;
let scaleValueH = '';
let milsH = 0;
let clicksH = 0;
let directToTurnH = true;

let clockwiseV = true;
let upOrDown = false;
let scaleValueV = '';
let milsV = 0;
let clicksV = 0;
let directToTurnV = true;

let coordX = 0;
let coordY = 0;

submit.addEventListener('click', submitHandler);
randomBtn.addEventListener('click', randomHandler);

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
  console.log('vertical clicks', clicksV);
  calculateVerticalTurn();

  console.log('horizontal clicks', clicksH);
  calculateHorizontalTurn();
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

  if (upDownContent.textContent === 'U' && clockwiseV && coords[coordY] > 0) {
    directToTurnV = true;
  } else if (
    upDownContent.textContent === 'D' &&
    clockwiseV &&
    coords[coordY] < 0
  ) {
    directToTurnV = true;
  } else if (
    upDownContent.textContent === 'U' &&
    !clockwiseV &&
    coords[coordY] < 0
  ) {
    directToTurnV = true;
  } else if (coords[coordY] === 0) {
    directToTurnV = 0;
  } else {
    directToTurnV = false;
  }

  // directToTurnV =
  //   upDownContent.textContent === 'D' && !clockwiseV && coords[coordY] > 0
  //     ? true
  //     : false;

  console.log('directToTurnV', directToTurnV);
  // console.log('coords', coords[coordY]);
  // console.log('letter', upDownContent.textContent);
  // console.log('за часовою', clockwiseV);
}

function calculateHorizontalTurn() {
  event.preventDefault();
  if (
    leftRightContent.textContent === 'R' &&
    clockwiseH &&
    coords[coordX] < 0
  ) {
    directToTurnH = true;
  } else if (
    leftRightContent.textContent === 'R' &&
    !clockwiseH &&
    coords[coordX] > 0
  ) {
    directToTurnH = true;
  } else if (
    leftRightContent.textContent === 'L' &&
    clockwiseH &&
    coords[coordX] > 0
  ) {
    directToTurnH = true;
  } else if (
    leftRightContent.textContent === 'L' &&
    !clockwiseH &&
    coords[coordX] < 0
  ) {
    directToTurnH = true;
  } else if (coords[coordX] === 0) {
    directToTurnH = 0;
  } else {
    directToTurnH = false;
  }

  console.log('directToTurnH', directToTurnH);
  // console.log('coords', coords[coordX]);
  // console.log('letter', leftRightContent.textContent);
  // console.log('за часовою', clockwiseH);
}

function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}
