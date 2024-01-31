export function getIndexOfUnit() {
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
