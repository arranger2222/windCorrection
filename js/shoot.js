const randomBtn = document.querySelector('.random');
const hit = document.querySelector('.hit');
const leftRightContent = document.querySelector('.left-right');
const upDownContent = document.querySelector('.up-down');
const scaleV = document.querySelector('.scale-v');
const scaleH = document.querySelector('.scale-h');
const unitsV = document.querySelector('.units-v');
const unitsH = document.querySelector('.units-h');
const verticalArrow = document.querySelector('.vertical > img');
const horizontalArrow = document.querySelector('.horizontal > img');

let clockwiseH = true;
let scaleValueH = 0;
let unitsTypeH = '';
let leftOrRight = '';

let clockwiseV = true;
let scaleValueV = 0;
let unitsTypeV = '';
let upOrDown = '';

let coordX = 0;
let coordY = 0;

randomBtn.addEventListener('click', randomHandler);

const coords = [-100, -66, -32, 0, 32, 66, 100];
const scaleValues = ['0.1', '0.2', '0.5', '1/2', '1/4'];
const objToVisible = {
  leftRightContent,
  horizontalArrow,
  upDownContent,
  verticalArrow,
  scaleV,
  scaleH,
  unitsV,
  unitsH,
  hit,
};

function randomHandler() {
  moveShoot();
  clockwiseH = getRandomBoolean();
  clockwiseV = getRandomBoolean();
  isClockwise(clockwiseH, horizontalArrow);
  isClockwise(clockwiseV, verticalArrow);

  scaleValueH = getScaleValue(scaleH);
  scaleValueV = getScaleValue(scaleV);
  unitsTypeH = getRandomBoolean();
  unitsTypeV = getRandomBoolean();
  getUnits(unitsTypeH, unitsH);
  getUnits(unitsTypeV, unitsV);

  isLeftOrRight();
  isUpOrDown();

  doVisible(objToVisible);

  // console.log('clockwiseH', clockwiseH);
  // console.log('scaleValueH', scaleValueH);
  // console.log('unitsTypeH', unitsTypeH);
  // console.log('leftOrRight', leftOrRight);
  // console.log('clockwiseV', clockwiseV);
  // console.log('scaleValueV', scaleValueV);
  // console.log('unitsTypeV', unitsTypeV);
  // console.log('upOrDown', upOrDown);
  // console.log('coordX', coordX);
  // console.log('coordY', coordY);
}

function moveShoot() {
  coordX = getRandomValue(0, 6);
  coordY = getRandomValue(0, 6);
  if (coordX === 3 && coordY === 3) {
    coordX = getRandomValue(0, 6);
    coordY = getRandomValue(0, 6);
  }
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
  const valueIndex = getRandomValue(0, 4);
  const value = scaleValues[valueIndex];
  element.textContent = value;
  return value;
}

function doVisible(obj) {
  const keys = Object.keys(obj);
  keys.map(key => {
    obj[key].classList.remove('hidden');
  });
}

function getUnits(param, element) {
  return param ? (element.textContent = 'MOA') : (element.textContent = 'MRAD');
}

function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}
