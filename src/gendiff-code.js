import _ from 'lodash';
import parser from './parsers.js';
import chooseFormatter from '../formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const parsedObj1 = parser(filepath1);
  const parsedObj2 = parser(filepath2);
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
        return {
          name: key, type: 'changed', valueBefore: _.cloneDeep(obj1[key]), valueAfter: _.cloneDeep(obj2[key]),
        };
      }
      return {
        name: key, value: 'nested', children: buildDiffTree(obj1[key], obj2[key]),
      };
    });
  };
  const tree = buildDiffTree(parsedObj1, parsedObj2);
  return chooseFormatter(tree, formatName);
};
export default genDiff;
