export function directCoefficient(hour) {
  let coeficientValue = 0;
  switch (hour) {
    case '1':
    case '5':
    case '7':
    case '11':
      coeficientValue = 0.5;
      break;
    case '1.5':
    case '4.5':
    case '7.5':
    case '10.5':
      coeficientValue = 0.67;
      break;
    case '2':
    case '4':
    case '8':
    case '10':
      coeficientValue = 0.75;
      break;
    case '12':
    case '6':
      coeficientValue = 0;
      break;
    case '3':
    case '9':
      coeficientValue = 1;
      break;
    default:
      console.log('This direct doesn"t exist.');
  }
  return coeficientValue;
}
