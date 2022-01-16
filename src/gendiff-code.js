import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';

const readFile = (filename) => fs.readFileSync(path.resolve('__fixtures__', filename), 'utf8');
const parseJson = (filename) => JSON.parse(readFile(filename));

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseJson(filepath1);
  const obj2 = parseJson(filepath2);
  const keys = Object.keys(obj1).concat(Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    if (obj1[key] === obj2[key]) {
      return `    ${key}: ${obj1[key]}`;
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    if (_.has(obj1, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    return `  + ${key}: ${obj2[key]}`;
  });
  const entries = _.sortedUniq(result);
  return `{\n${entries.join('\n')}\n}`;
};
export default genDiff;
