import { getIndexOfUnit } from './getRandomArrayIndex.js';
import { startTimer, stopTimer, resetTimer } from './timer.js';

const btn_removeRef = [...document.querySelectorAll('[data-decrement]')];
const horizontalArrowRef = document.querySelector('.horizontal > img');
const answerTextMessageRef = document.querySelector('.answer-message');
const btn_addRef = [...document.querySelectorAll('[data-increment]')];
const leftRightTextContentRef = document.querySelector('.left-right');
const horizontalTurretScaleRef = document.querySelector('.scale-h');
const verticalArrowRef = document.querySelector('.vertical > img');
const verticalTurretScaleRef = document.querySelector('.scale-v');
const horizontalInputFieldRef = document.getElementById('hInput');
// const inputWrapperRef = document.querySelector('.input-wrapper');
const upDownTextContentRef = document.querySelector('.up-down');
const horizontalRadioRef = document.querySelectorAll('.hRadio');
const verticalInputFieldRef = document.getElementById('vInput');
const verticalRadioRef = document.querySelectorAll('.vRadio');
const targetPointRef = document.querySelector('.target');
const randomBtnRef = document.querySelector('.random');
const formRef = document.querySelector('.form-shoot');
const submitButton = document.querySelector('.submit__shoot');
const scopeUnitsRef = document.querySelector('.scope__info-units');

let leftOrRightTurretLetter = '';
let isClockwiseHorisontalTurret = true;
let horisontalTurretScaleUnits = '';

let upOrDownTurretLetter = '';
let isClockwiseVerticalTurret = true;
let verticalTurretScaleUnits = '';

let calculatedDirectToTurnHorizontal = '';
let calculatedDirectToTurnVertical = '';
let calculatedHorizontalClicks = 0;
let calculatedVerticalClicks = 0;
let calculatedHorizontalRange = 0;
let calculatedVerticalRange = 0;

let userVerticalDirectValue = null;
let userHorizontalDirectValue = null;
let userVericalClicksValue = null;
let userHorizontalClicksValue = null;

let message = '';
let coordX = 0;
let coordY = 0;

let isVerticalRadioChecked = false;
let isHorizontalRadioChecked = false;

const coords = [-100, -82, -66, -50, -32, -16, 0, 16, 32, 50, 66, 82, 100];
const pricesOfClick = ['0.1 MRAD', '0.5 ТИС', '1/4 MOA', '1/8 MOA'];
const objToVisible = {
  leftRightTextContentRef,
  horizontalArrowRef,
  upDownTextContentRef,
  verticalArrowRef,
  verticalTurretScaleRef,
  horizontalTurretScaleRef,
  targetPointRef,
};

formRef.addEventListener('submit', submitHandler);
randomBtnRef.addEventListener('click', randomHandler);
btn_addRef.forEach(btn => btn.addEventListener('click', increment));
btn_removeRef.forEach(btn => btn.addEventListener('click', decrement));
horizontalRadioRef.forEach(radio => {
  radio.addEventListener('change', () => {
    isVerticalRadioChecked = true;

    handlerRadioButton();
  });
});
verticalRadioRef.forEach(radio => {
  radio.addEventListener('change', () => {
    isHorizontalRadioChecked = true;

    handlerRadioButton();
  });
});

function handlerRadioButton() {
  return isVerticalRadioChecked && isHorizontalRadioChecked
    ? setSubmitButtonState(true)
    : false;
}

function setSubmitButtonState(toggle) {
  return toggle
    ? (submitButton.disabled = false)
    : (submitButton.disabled = true);
}

// =========================== RANDOM HANDLER =================================
function randomHandler() {
  moveShoot();
  isLeftOrRight();
  isUpOrDown();

  isClockwiseHorisontalTurret = getRandomBoolean();
  isClockwiseVerticalTurret = getRandomBoolean();
  isClockwise(isClockwiseHorisontalTurret, horizontalArrowRef);
  isClockwise(isClockwiseVerticalTurret, verticalArrowRef);

  horisontalTurretScaleUnits = getScaleValue(horizontalTurretScaleRef);
  verticalTurretScaleUnits = horisontalTurretScaleUnits;
  verticalTurretScaleRef.textContent = verticalTurretScaleUnits;

  calculatedHorizontalClicks = calculateClicks(
    calculatedHorizontalRange,
    pricesOfClick.indexOf(horisontalTurretScaleUnits),
  );

  calculatedVerticalClicks = calculateClicks(
    calculatedVerticalRange,
    pricesOfClick.indexOf(verticalTurretScaleUnits),
  );

  calculatedDirectToTurnVertical = calculateVerticalTurn(
    upDownTextContentRef.textContent,
    isClockwiseVerticalTurret,
    coords[coordY],
  );
  calculatedDirectToTurnHorizontal = calculateHorizontalTurn(
    leftRightTextContentRef.textContent,
    isClockwiseHorisontalTurret,
    coords[coordX],
  );

  answerTextMessageRef.textContent = '';

  doVisible(objToVisible);
  clearForm();
  startTimer();
}

// =========================== SUBMIT HANDLER =================================

function submitHandler() {
  event.preventDefault();
  getFormData();

  if (
    calculatedDirectToTurnVertical === userVerticalDirectValue &&
    calculatedDirectToTurnHorizontal === userHorizontalDirectValue &&
    userVericalClicksValue == calculatedVerticalClicks &&
    userHorizontalClicksValue == calculatedHorizontalClicks
  ) {
    message = 'Відповідь вірна!:)';
    answerTextMessageRef.classList.add('correct');
    answerTextMessageRef.classList.remove('wrong');
    setSubmitButtonState(false);
    clearForm();
    stopTimer();
    startTimer(5);

    targetPointRef.classList.add('hidden');
    randomHandler();
    // console.log('answer right!!!');
  } else {
    // console.log('horizontal', {
    //   calculatedHorizontalClicks,
    //   isClockwiseHorisontalTurret,
    // });
    // console.log('vertical', {
    //   calculatedVerticalClicks,
    //   isClockwiseVerticalTurret,
    // });
    message = `Відповідь невірна:( Правильна відповідь: ${calculatedVerticalClicks} ${correctClickWord(
      calculatedVerticalClicks,
    )} ${correctDirectionInWrongAnswer(
      calculatedDirectToTurnVertical,
    )}  по вертикалі та ${calculatedHorizontalClicks} ${correctClickWord(
      calculatedHorizontalClicks,
    )} ${correctDirectionInWrongAnswer(
      calculatedDirectToTurnHorizontal,
    )} по горизонталі`;
    // console.log('answer wrong!');
    answerTextMessageRef.classList.add('wrong');
    answerTextMessageRef.classList.remove('correct');
    setSubmitButtonState(false);
    resetTimer(60);
  }

  if (!isPageScrolledToBottom()) {
    scrollToBottom();
  }

  answerTextMessageRef.textContent = message;
  // clearForm();
}

function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

function isPageScrolledToBottom() {
  return window.innerHeight + window.scrollY >= document.body.scrollHeight;
}

function moveShoot() {
  coordX = getRandomValue(0, 12);
  coordY = getRandomValue(0, 12);
  if (coordX === 6 && coordY === 6) {
    coordX = getRandomValue(0, 12);
    coordY = getRandomValue(0, 12);
  }
  calculatedHorizontalRange = getMilsFromCoords(coords[coordX]);
  calculatedVerticalRange = getMilsFromCoords(coords[coordY]);

  // console.log('horizontal Range:', calculatedHorizontalRange);
  // console.log('vertical Range:', calculatedVerticalRange);

  targetPointRef.style.transform = `translate(${coords[coordX]}px, ${coords[coordY]}px )`;
}

function isClockwise(param, element) {
  return param
    ? element.classList.remove('flipped')
    : element.classList.add('flipped');
}

function isLeftOrRight() {
  leftOrRightTurretLetter = getRandomBoolean() ? 'L' : 'R';
  leftRightTextContentRef.textContent = leftOrRightTurretLetter;
  console.log('random letter -', leftOrRightTurretLetter);
}

function isUpOrDown() {
  upOrDownTurretLetter = getRandomBoolean() ? 'U' : 'D';
  upDownTextContentRef.textContent = upOrDownTurretLetter;
}

function getScaleValue(element) {
  const value = getIndexOfUnit();
  const unitsName = value === 0 || value === 1 ? 'mil' : 'MOA';
  scopeUnitsRef.textContent = `- ${unitsName}`;
  element.textContent = pricesOfClick[value];
  return pricesOfClick[value];
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

function calculateClicks(range, index) {
  let quantity = 0;
  // console.log('range', range);
  // console.log('index', index);
  switch (index) {
    case 0:
      quantity = range * 10;
      break;
    case 1:
      quantity = range * 2;
      break;
    case 2:
      quantity = range * 4;
      break;
    case 3:
      quantity = range * 8;
      break;
    default:
      range;
  }
  return quantity;
}

function calculateVerticalTurn(letter, isClockwise, coord) {
  // console.log('letter', letter);
  // console.log('isClockwise', isClockwise);
  // console.log('coord', coord);
  let verticalTurn = '';

  if (letter === 'U' && isClockwise && coord > 0) {
    verticalTurn = 'clockwise';
  } else if (letter === 'U' && !isClockwise && coord > 0) {
    verticalTurn = 'anticlockwise';
  } else if (letter === 'U' && isClockwise && coord < 0) {
    verticalTurn = 'anticlockwise';
  } else if (letter === 'U' && !isClockwise && coord < 0) {
    verticalTurn = 'clockwise';
  } else if (letter === 'D' && isClockwise && coord < 0) {
    verticalTurn = 'clockwise';
  } else if (letter === 'D' && !isClockwise && coord < 0) {
    verticalTurn = 'anticlockwise';
  } else if (letter === 'D' && isClockwise && coord > 0) {
    verticalTurn = 'anticlockwise';
  } else if (letter === 'D' && !isClockwise && coord > 0) {
    verticalTurn = 'clockwise';
  } else if (coord === 0) {
    verticalTurn = 'center';
  } else {
    verticalTurn = 'anticlockwise';
  }

  return verticalTurn;
}

function calculateHorizontalTurn(letter, isClockwise, coord) {
  console.log('letter', letter);
  console.log('isClockwise', isClockwise);
  console.log('coord', coord);
  let horizontalTurn = '';

  if (letter === 'L' && isClockwise && coord > 0) {
    console.log('case 1');
    horizontalTurn = 'clockwise';
  } else if (letter === 'L' && !isClockwise && coord > 0) {
    console.log('case 2');
    horizontalTurn = 'anticlockwise';
  } else if (letter === 'L' && isClockwise && coord < 0) {
    console.log('case 3');
    horizontalTurn = 'anticlockwise';
  } else if (letter === 'L' && !isClockwise && coord < 0) {
    console.log('case 4');
    horizontalTurn = 'clockwise';
  } else if (letter === 'R' && isClockwise && coord < 0) {
    console.log('case 5');
    horizontalTurn = 'clockwise';
  } else if (letter === 'R' && !isClockwise && coord < 0) {
    console.log('case 6');
    horizontalTurn = 'anticlockwise';
  } else if (letter === 'R' && isClockwise && coord > 0) {
    console.log('case 7');
    horizontalTurn = 'anticlockwise';
  } else if (letter === 'R' && !isClockwise && coord > 0) {
    console.log('case 8');
    horizontalTurn = 'clockwise';
  } else if (coord === 0) {
    horizontalTurn = 'center';
  } else {
    horizontalTurn = 'anticlockwise';
  }

  return horizontalTurn;
}

function correctClickWord(number) {
  if (number === 1 || (number % 100 > 20 && number % 10 === 1)) {
    return 'клік';
  } else if (
    (number >= 2 && number <= 4) ||
    (number % 100 > 20 && number % 10 >= 2 && number % 10 <= 4)
  ) {
    return 'кліки';
  } else {
    return 'кліків';
  }
}

function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}

function clearForm() {
  formRef.reset();
}

function doVisible(obj) {
  const keys = Object.keys(obj);
  keys.map(key => {
    obj[key].classList.remove('hidden');
  });
}

function getFormData() {
  event.preventDefault();

  userVerticalDirectValue = Array.from(verticalRadioRef).find(
    radio => radio.checked,
  )?.value;
  userHorizontalDirectValue = Array.from(horizontalRadioRef).find(
    radio => radio.checked,
  )?.value;

  userVericalClicksValue = verticalInputFieldRef.value;
  userHorizontalClicksValue = horizontalInputFieldRef.value;

  // console.log(userVerticalDirectValue);
  // console.log(userHorizontalDirectValue);
  // console.log(userVericalClicksValue);
  // console.log(userHorizontalClicksValue);
}

function decrement(e) {
  const parent = e.target.parentElement;
  const input = parent.querySelector('input[type="number"]');
  let value = Number(input.value);
  input.value > 0 ? (value -= 1) : (value = 0);
  if (input.value === 0) {
    value.input = '';
    input.value = value;
  }
  input.value = value;
}

function increment(e) {
  const input = e.target.previousElementSibling;
  let value = Number(input.value);
  value += 1;
  input.value = value;
}

function correctDirectionInWrongAnswer(direction) {
  switch (direction) {
    case 'clockwise':
      return 'за годинниковою стрілкою';
    case 'anticlockwise':
      return 'проти годинникової стрілки';
    case 'center':
      return '';
    default:
      return 'Невідомий напрямок';
  }
}
