const directionRadioButtons = document.querySelectorAll('.direction-input');
const correctionInput = document.querySelector('.result-input');
const answerText = document.querySelector('.answer-message');
const buttonRandom = document.querySelector('.random');
const submitButton = document.querySelector('.check');
const directText = document.querySelector('.direct');
const speedText = document.querySelector('.speed');
const koefText = document.querySelector('.koef');
const form = document.querySelector('.form');

buttonRandom.addEventListener('click', randomHandler);
submitButton.addEventListener('click', handleSubmit);

directionRadioButtons.forEach(radio => {
  radio.addEventListener('change', handlerRadioButton);
});
let clickCorrection = 0;
let leftOrRight = '';
let makeDisable = true;

let userClickCorrection = 0;
let userLeftOrRightDirection = '';

const hours = [
  '12.00',
  '13.00',
  '13.30',
  '14.00',
  '15.00',
  '16.00',
  '16.30',
  '17.00',
  '18.00',
  '19.00',
  '19.30',
  '20.00',
  '21.00',
  '22.00',
  '22.30',
  '23.00',
];

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

function directCoefficient(hour) {
  let coeficientValue = 0;
  switch (hour) {
    case '13.00':
    case '17.00':
    case '19.00':
    case '23.00':
      coeficientValue = 0.5;
      break;
    case '13.30':
    case '16.30':
    case '19.30':
    case '22.30':
      coeficientValue = 0.67;
      break;
    case '14.00':
    case '16.00':
    case '20.00':
    case '22.00':
      coeficientValue = 0.75;
      break;
    case '12.00':
    case '18.00':
      coeficientValue = 0;
      break;
    case '15.00':
    case '21.00':
      coeficientValue = 1;
      break;
    default:
      console.log('This direct doesn"t exist.');
  }
  return coeficientValue;
}

function calculateLefOrRight(hour) {
  switch (hour) {
    case '13.00':
    case '13.30':
    case '14.00':
    case '14.30':
    case '15.00':
    case '15.30':
    case '16.00':
    case '16.30':
    case '17.00':
    case '17.30':
      leftOrRight = 'r+';
      break;
    case '19.00':
    case '19.30':
    case '20.00':
    case '20.30':
    case '21.00':
    case '21.30':
    case '22.00':
    case '22.30':
    case '23.00':
    case '23.30':
      leftOrRight = 'l+';
      break;
    case '12.00':
    case '18.00':
      leftOrRight = 'center';
      break;
    default:
      console.log('center');
  }
}

function clearForm() {
  form.reset();
}
