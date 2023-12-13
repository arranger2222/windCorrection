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
} from './refs.js';

buttonRandom.addEventListener('click', randomHandler);
submitButton.addEventListener('click', handleSubmit);

directionRadioButtons.forEach(radio => {
  radio.addEventListener('change', handlerRadioButton);
});
let clickCorrection = 0;
// let leftOrRight = '';
// let makeDisable = true;

let userClickCorrection = 0;
let userLeftOrRightDirection = '';

function handlerRadioButton() {
  setSubmitButtonState(true);
}

function randomHandler() {
  const indexOfDirect = getRandomValue(0, 15);
  const windDirection = hours[indexOfDirect];
  const koefficient = getRandomValue(1, 7) / 10;
  const windSpeed = getRandomValue(1, 9);
  const windCoeff = directCoefficient(windDirection);
  calculateLefOrRight(windDirection);

  windCorrections(windSpeed, windCoeff, koefficient);
  answerText.textContent = '';
  clearForm();

  directText.textContent = windDirection;
  speedText.textContent = `${windSpeed} м/с`;
  koefText.textContent = `${koefficient} mil`;

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
  let message = '';

  userClickCorrection = Number(correctionValue);
  userLeftOrRightDirection = directionValue;
  if (
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

function windCorrections(speed, direct, koeff) {
  clickCorrection = (speed * direct * koeff).toFixed(1) * 10;
}

function clearForm() {
  form.reset();
}
