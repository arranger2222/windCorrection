const timerElement = document.getElementById('timer');
const backdrop = document.querySelector('.backdrop');
const toggleElement = document.getElementById('toggle');
const againBtn = document.querySelector('.again-btn');

let initialSeconds = 60;
let seconds = 0;
let timerInterval;
let timerVisible = false;

document.addEventListener('keydown', hideOnEsc);
againBtn.addEventListener('click', hideTimerMessage);
toggleElement.addEventListener('click', toggleTimerVisibilityToggle);

export function startTimer(value) {
  if (value) {
    initialSeconds -= value;
  }
  seconds = initialSeconds;
  if (timerVisible && !timerInterval) {
    timerElement.classList.add('active');
    timerInterval = setInterval(updateTimer, 1000);
  }
}

export function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

export function resetTimer(value) {
  stopTimer();
  if (value) {
    initialSeconds -= value;
  }
  // initialSeconds = 60;
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
  initialSeconds = 60;
}

function hideTimerMessage() {
  backdrop.classList.add('hidden');
  timerElement.textContent = `00:00:${initialSeconds}`;
}

function toggleTimerVisibilityToggle() {
  timerVisible = !timerVisible;
  timerElement.classList.contains('timer-numbers-hidden')
    ? timerElement.classList.remove('timer-numbers-hidden')
    : timerElement.classList.add('timer-numbers-hidden');
  timerElement;
  if (timerVisible) {
    initialSeconds = 60;
    timerElement.textContent = `00:00:${initialSeconds}`;
  }
  if (!timerVisible) {
    stopTimer();
    resetTimer(initialSeconds);
  }

  timerVisible = toggleElement.checked;
}

function hideOnEsc(event) {
  if (event.key === 'Escape') {
    hideTimerMessage();
  }
}
