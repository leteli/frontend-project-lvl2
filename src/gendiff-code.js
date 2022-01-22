import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';
import parser from './parsers.js';

export const getPath = (filename) => path.resolve('__fixtures__', filename);

export const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

export const genDiff = (filepath1, filepath2) => {
  const parsedObj1 = parser(readFile(filepath1), filepath1);
  const parsedObj2 = parser(readFile(filepath2), filepath2);
  const buildDiffTree = (obj1, obj2) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
    return keys.flatMap((key) => {
      if (!_.has(obj2, key)) {
        return {
          name: key, type: 'deleted', value: _.cloneDeep(obj1[key]),
        };
      } if (!_.has(obj1, key)) {
        return {
          name: key, type: 'added', value: _.cloneDeep(obj2[key]),
        };
      } if (obj1[key] === obj2[key]) {
        return {
          name: key, type: 'unchanged', value: _.cloneDeep(obj1[key]),
        };
      }
      if (!(_.isObject(obj1[key]) && _.isObject(obj2[key]))) {
        return [{
          name: key, type: 'deleted', value: _.cloneDeep(obj1[key]),
        }, {
          name: key, type: 'added', value: _.cloneDeep(obj2[key]),
        }];
      }
      return {
        name: key, value: 'nested', children: buildDiffTree(obj1[key], obj2[key]),
      };
    });
  };
  return buildDiffTree(parsedObj1, parsedObj2);
};
