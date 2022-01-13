import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys = Object.keys(obj1).concat(Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    if (obj1[key] === obj2[key]) {
      return `   ${key}: ${obj1[key]}`
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return ` - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}`;
    }
    if (_.has(obj1, key)) {
      return ` - ${key}: ${obj1[key]}`;
    }
    if (_.has(obj2, key)) {
      return ` + ${key}: ${obj2[key]}`;
    }
  });
  const entries = _.sortedUniq(result);
  return `{\n${entries.join('\n')}\n}`;
};
export default genDiff;
