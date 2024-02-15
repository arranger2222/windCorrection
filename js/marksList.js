const marksList = document.querySelector('.marks-list');
const resetMarksButton = document.querySelector('.reset-marks');

resetMarksButton.addEventListener('click', clearAllMarks);

export function createMark() {
  const markLiMarkup = `<li class="marks__item">
      <img
        src="./assets/correct_mark.png"
        alt="correct-mark icon"
        class="correct-mark"
      />
    </li>`;

  marksList.insertAdjacentHTML('beforeend', markLiMarkup);
  doVisibleResetBtn();
}

export function clearAllMarks() {
  marksList.innerHTML = '';
  doInvisibleResetBtn();
}

function doVisibleResetBtn() {
  resetMarksButton.classList.remove('reset-marks--hidden');
}

function doInvisibleResetBtn() {
  resetMarksButton.classList.add('reset-marks--hidden');
}
