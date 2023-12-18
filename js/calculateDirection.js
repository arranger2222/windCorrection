export let leftOrRight = '';
export function calculateLefOrRight(hour) {
  switch (hour) {
    case '1':
    case '1.5':
    case '2':
    case '3':
    case '4':
    case '4.5':
    case '5':
      leftOrRight = 'r+';
      break;
    case '7':
    case '7.5':
    case '8':
    case '9':
    case '10':
    case '10.5':
    case '11':
      leftOrRight = 'l+';
      break;
    case '12':
    case '6':
      leftOrRight = 'center';
      break;
    default:
      console.log('center');
  }
}
