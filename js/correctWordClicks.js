export function correctClickWord(number) {
  // if (number < 0 || number % 1 !== 0) {
  //     return "Некоректне number";
  // }

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
