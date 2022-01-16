import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';

export const getPath = (filename) => path.resolve('__fixtures__', filename);

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

export const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(readFile(filepath1));
  const obj2 = JSON.parse(readFile(filepath2));
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
