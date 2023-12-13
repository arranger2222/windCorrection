export let leftOrRight = '';
export function calculateLefOrRight(hour) {
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
