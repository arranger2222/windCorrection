import { hours } from './hours.js';
import { directCoefficient } from './calculateCoefficient.js';
import { calculateLefOrRight, leftOrRight } from './calculateDirection.js';
import {
  directionRadioButtons,
  correctionInput,
  answerText,
  buttonRandom,
  submitButton,
  directText,
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
let priceOfClick = '';
let message = '';

let indexOfDirect = 0;
let windDirection = '';
let koefficient = '';
let windSpeed = '';
let windCoeff = '';
let indexOfUnit = '';

const pricesOfClick = ['0.1 MRAD', '0.5 ТИС', '1/4 MOA', '1/8 MOA'];

function handlerRadioButton() {
  setSubmitButtonState(true);
}

function randomHandler() {
  indexOfDirect = getRandomValue(0, 15);
  console.log(indexOfDirect);
  windDirection = hours[indexOfDirect];

  windSpeed = getRandomValue(1, 9);
  windCoeff = directCoefficient(windDirection);
  indexOfUnit = getIndexOfUnit();
  setSubmitButtonState(false);
  const unitsName = indexOfUnit === 0 || indexOfUnit === 1 ? 'mil' : 'MOA';
  koefficient =
    unitsName === 'mil'
      ? getRandomValue(1, 6) / 10
      : getRandomValue(2, 21) / 10;

  switch (indexOfUnit) {
    case 0:
      priceOfClick = 0.1;
      break;
    case 1:
      priceOfClick = 0.5;
      break;
    case 2:
      priceOfClick = 0.25;
      break;
    case 3:
      priceOfClick = 0.125;
      break;

    default:
      break;
  }

  hint.textContent = pricesOfClick[indexOfUnit];
  startTimer();

  calculateLefOrRight(windDirection);

  windCorrections(windSpeed, windCoeff, koefficient, priceOfClick, unitsName);
  answerText.textContent = '';
  clearForm();

  directText.textContent = windDirection;
  speedText.textContent = `${windSpeed} м/с`;
  koefText.textContent = `${koefficient} ${unitsName}`;
  // koefText.textContent = `${koefficient} ${coefUnits}`;

  directText.classList.add('active');
  speedText.classList.add('active');
  koefText.classList.add('active');

  // setSubmitButtonState(false);
}
function setSubmitButtonState(toggle) {
  return toggle
    ? (submitButton.disabled = false)
    : (submitButton.disabled = true);
}

function handleSubmit(event) {
  event.preventDefault();

  const correctionValue = correctionInput.value;
  const directionValue = Array.from(directionRadioButtons).find(
    radio => radio.checked,
  )?.value;

  userClickCorrection = Number(correctionValue);
  userLeftOrRightDirection = directionValue;
  if (!userClickCorrection && !windDirection) {
    message = 'Ви не обрали задачу!';
  } else if (clickCorrection === 0) {
    message = 'Відповідь вірна!';

    stopTimer();
    resetTimer(5);
    randomHandler();
    // startTimer(5);
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
    stopTimer();
    // resetTimer();
    startTimer(5);
    randomHandler();
  } else {
    message = `Відповідь невірна :(  Правильна відповідь: ${clickCorrection} ${correctClickWord(
      clickCorrection,
    )} ${leftOrRight.toUpperCase()}`;
    answerText.classList.add('wrong');
    answerText.classList.remove('correct');
    resetTimer(60);
    setSubmitButtonState(false);
  }
  answerText.textContent = message;
}

function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getIndexOfUnit() {
  // const опції = ['0.1 MRAD', '0.5 ТИС', '1/4 MOA', '1/8 MOA'];
  const randomNumber = Math.random();

  if (randomNumber < 0.6) {
    return 0;
  } else if (randomNumber < 0.8) {
    return 1;
  } else if (randomNumber < 0.9) {
    return 2;
  } else {
    return 3;
  }
}

function windCorrections(speed, direct, koeff, price) {
  // const calculateCorrections = (speed * direct * koeff).toFixed(2) / price;
  clickCorrection = Math.round((speed * direct * koeff).toFixed(2) / price);

  // clickCorrection = Math.round(
  //   name === 'moa' ? calculateCorrections * 3.5 : calculateCorrections,
  // );
  const isNull = clickCorrection < 1;
  if (isNull) {
    leftOrRight === 'CENTER';
    message = 'Відповідь вірна!';
    stopTimer();

    startTimer(5);
    randomHandler();
  }
}

function clearForm() {
  form.reset();
}
