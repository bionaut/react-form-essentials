import validator from 'validator';
import string2Object from './string2Object';

export default function (validators, value) {
  const queue = string2Object(validators);
  const valResults = Object.keys(queue).map(mapper);
  return valResults.indexOf(false) === -1;

  function mapper(proces) {
    switch (proces) {
      case 'isDivisibleBy':
        return validator.isDivisibleBy(value, queue[proces][0]);
      case 'contains':
        return validator.contains(value, queue[proces][0]);
      case 'isLength':
        const options = queue[proces][1]
          ? { min: queue[proces][0],
              max: queue[proces][1]}
          : { min: queue[proces][0]};
        return validator.isLength(value, options);
      default:
        return validator[proces](value);
    }
  }
}