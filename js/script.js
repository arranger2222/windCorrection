import { hours } from './hours.js';
import { directCoefficient } from './calculateCoefficient.js';
import { createMark, clearAllMarks } from './marksList.js';
import { calculateLefOrRight, leftOrRight } from './calculateDirection.js';
import {
  directionRadioButtons,
  correctionInput,
  answerText,
  buttonRandom,
  submitButton,
  directText,
  directHint,
  speedText,
  koefText,
  form,
  hint,
} from './refs.js';
import { startTimer, stopTimer, resetTimer } from './timer.js';
import { correctClickWord } from './correctWordClicks.js';

buttonRandom.addEventListener('click', randomHandler);
submitButton.addEventListener('click', handleSubmit);

directionRadioButtons.forEach(radio => {
  radio.addEventListener('change', handlerRadioButton);
});

let clickCorrection = 0;

let userClickCorrection = 0;
let userLeftOrRightDirection = '';
let priceOfClick = 0;
let message = '';

let indexOfDirect = 0;
let windDirection = '';
let bulletSurfKoef = '';
let windSpeed = 0;
let windCoeff = '';
let nameOfUnit = '';

// const pricesOfClick = ['0.1 MRAD', '0.5 ТИС', '1/4 MOA', '1/8 MOA'];

function handlerRadioButton() {
  setSubmitButtonState(true);
  // console.log(event.currentTarget.value);
  directHint.textContent = event.currentTarget.value;
}

//=========================== RANDOM  HANDLER ==================================

function randomHandler() {
  event.preventDefault();
  indexOfDirect = getRandomValue(0, 15);
  windDirection = hours[indexOfDirect];
  windSpeed = getRandomValue(1, 9);
  windCoeff = directCoefficient(windDirection);
  nameOfUnit = getNameOfUnit();

  const unitsName = nameOfUnit;
  // === 'mil' || nameOfUnit === 'ТИС' ? 'mil' : 'MOA';
  bulletSurfKoef =
    unitsName === 'mil'
      ? getRandomValue(1, 10) / 10
      : getRandomValue(1, 30) / 10;

  // switch (indexOfUnit) {
  //   case 0:
  //     priceOfClick = 0.1;
  //     break;
  //   case 1:
  //     priceOfClick = 0.5;
  //     break;
  //   case 2:
  //     priceOfClick = 0.25;
  //     break;
  //   case 3:
  //     priceOfClick = 0.125;
  //     break;

  //   default:
  //     break;
  // }

  hint.textContent = nameOfUnit;
  directHint.textContent = ' ';

  startTimer();

  calculateLefOrRight(windDirection);

  windCorrections(
    windSpeed,
    windCoeff,
    bulletSurfKoef,
    // priceOfClick,
    // unitsName,
  );
  answerText.textContent = '';
  clearForm();

  directText.textContent = windDirection;
  speedText.textContent = `${windSpeed} м/с`;
  koefText.textContent = `${bulletSurfKoef} ${unitsName}`;

  directText.classList.add('active');
  speedText.classList.add('active');
  koefText.classList.add('active');
  setSubmitButtonState(false);
}
function setSubmitButtonState(toggle) {
  return toggle
    ? (submitButton.disabled = false)
    : (submitButton.disabled = true);
}

//========================== SUBMIT ================================

function handleSubmit(event) {
  event.preventDefault();

  const correctionValue = correctionInput.value.replace(',', '.');
  const directionValue = Array.from(directionRadioButtons).find(
    radio => radio.checked,
  )?.value;

  userClickCorrection = correctionValue;
  // userClickCorrection = Number(correctionValue);
  userLeftOrRightDirection = directionValue;
  if (!userClickCorrection && !windDirection) {
    message = 'Ви не обрали задачу!';
  } else if (clickCorrection === 0 && userClickCorrection === 0) {
    message = 'Відповідь вірна!';
    setSubmitButtonState(false);
    stopTimer();
    createMark();
    randomHandler();
    startTimer(5);
    answerText.classList.add('correct');
    answerText.classList.remove('wrong');
  } else if (
    clickCorrection !== 0 &&
    userClickCorrection === clickCorrection &&
    userLeftOrRightDirection === leftOrRight
  ) {
    message = 'Відповідь вірна!';
    answerText.classList.add('correct');
    answerText.classList.remove('wrong');
    hint.textContent = ' ';
    stopTimer();
    startTimer(5);
    randomHandler();
    clearForm();
    createMark();
  } else {
    message = `Відповідь невірна :(  Правильна відповідь: ${clickCorrection} ${nameOfUnit}
      ${leftOrRight.toUpperCase()}`;
    // message = `Відповідь невірна :(  Правильна відповідь: ${clickCorrection} ${correctClickWord(
    //   clickCorrection,
    // )} ${leftOrRight.toUpperCase()}`;
    answerText.classList.add('wrong');
    answerText.classList.remove('correct');
    resetTimer(60);
    setSubmitButtonState(false);
    clearAllMarks();
  }

  answerText.textContent = message;
}

function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getNameOfUnit() {
  const randomNumber = Math.random();

  if (randomNumber < 0.7) {
    return 'mil';
  } else {
    return 'MOA';
  }
}

function windCorrections(speed, direct, koeff) {
  clickCorrection = (speed * direct * koeff).toFixed(1);
}

function clearForm() {
  form.reset();
}
