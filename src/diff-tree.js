import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.flatMap((key) => {
    if (!_.has(obj2, key)) {
      return {
        name: key, type: 'deleted', value: obj1[key],
      };
    }
    if (!_.has(obj1, key)) {
      return {
        name: key, type: 'added', value: obj2[key],
      };
    }
    if (obj1[key] === obj2[key]) {
      return {
        name: key, type: 'unchanged', value: obj1[key],
      };
    }
    if (!(_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key]))) {
      return {
        name: key, type: 'changed', valueBefore: obj1[key], valueAfter: obj2[key],
      };
    }
    return {
      name: key, type: 'nested', children: buildDiffTree(obj1[key], obj2[key]),
    };
  });
};
export default buildDiffTree;
