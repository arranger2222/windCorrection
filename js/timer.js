const timerElement = document.getElementById('timer');
const backdrop = document.querySelector('.backdrop');
const toggleElement = document.getElementById('toggle');
const againBtn = document.querySelector('.again-btn');

let initialSeconds = 60;
let seconds = initialSeconds;
let timerInterval;
let timerVisible = false;

againBtn.addEventListener('click', hideTimerMessage);
toggleElement.addEventListener('click', toggleTimerVisibilityToggle);

export function startTimer() {
  timerElement.classList.add('active');
  if (!timerInterval && timerVisible) {
    timerInterval = setInterval(updateTimer, 1000);
  }
}

export function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

export function resetTimer() {
  stopTimer();
  seconds = initialSeconds;
  updateTimerDisplay();
  hideTimerMessage();
}

function updateTimer() {
  seconds--;
  updateTimerDisplay();

  if (seconds <= 0) {
    stopTimer();
    showTimerMessage();
  }
}

function updateTimerDisplay() {
  const timerElement = document.getElementById('timer');
  timerElement.textContent = formatTime(seconds);
  if (timerVisible && seconds > 0) {
    requestAnimationFrame(updateTimerDisplay);
  }
}

function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function showTimerMessage() {
  backdrop.classList.remove('hidden');
}

function hideTimerMessage() {
  backdrop.classList.add('hidden');
  timerElement.textContent = `00:00:${initialSeconds}`;
}

function toggleTimerVisibilityToggle() {
  timerVisible = !timerVisible;
  timerElement.classList.contains('hidden')
    ? timerElement.classList.remove('hidden')
    : timerElement.classList.add('hidden');
  timerElement;
  if (timerVisible) {
    timerElement.textContent = `00:00:${initialSeconds}`;
  }
  if (!timerVisible) {
    stopTimer();
    resetTimer();
  }

  timerVisible = toggleElement.checked;
}