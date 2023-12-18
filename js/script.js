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
const pricesOfClick = ['0.1 MRAD', '0.5 MRAD', '1/4 MOA', '1/8 MOA'];

function handlerRadioButton() {
  setSubmitButtonState(true);
}

function randomHandler() {
  const indexOfDirect = getRandomValue(0, 15);
  const windDirection = hours[indexOfDirect];
  const koefficient = getRandomValue(1, 7) / 10;
  const windSpeed = getRandomValue(1, 9);
  const windCoeff = directCoefficient(windDirection);
  const indexOfUnit = getRandomValue(0, 3);
  const unitsName = indexOfUnit === 0 || indexOfUnit === 1 ? 'mil' : 'moa';
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

  calculateLefOrRight(windDirection);

  windCorrections(windSpeed, windCoeff, koefficient, priceOfClick, unitsName);
  answerText.textContent = '';
  clearForm();

  directText.textContent = windDirection;
  speedText.textContent = `${windSpeed} м/с`;
  koefText.textContent = `${koefficient} mil`;
  // koefText.textContent = `${koefficient} ${coefUnits}`;

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

function handleSubmit(event) {
  event.preventDefault();

  const correctionValue = correctionInput.value;
  const directionValue = Array.from(directionRadioButtons).find(
    radio => radio.checked,
  )?.value;

  userClickCorrection = Number(correctionValue);
  userLeftOrRightDirection = directionValue;
  if (clickCorrection === 0) {
    message = 'Відповідь вірна!';
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
  } else {
    message = `Відповідь невірна :(  Правильна відповідь: ${clickCorrection} clicks ${leftOrRight.toUpperCase()}`;
    answerText.classList.add('wrong');
    answerText.classList.remove('correct');
  }
  answerText.textContent = message;
}

function getRandomValue(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function windCorrections(speed, direct, koeff, price, name) {
  const calculateCorrections = (speed * direct * koeff).toFixed(2) / price;
  clickCorrection = Math.round(
    name === 'moa' ? calculateCorrections * 3.5 : calculateCorrections,
  );
  const isNull = clickCorrection < 1;
  console.log(isNull);
  if (isNull) {
    leftOrRight === 'CENTER';
    message = 'Відповідь вірна!';
  }
  console.log('clickCorrection', clickCorrection);
}

function clearForm() {
  form.reset();
}
