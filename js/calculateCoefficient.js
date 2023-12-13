export function directCoefficient(hour) {
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
