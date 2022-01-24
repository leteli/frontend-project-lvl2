import _ from 'lodash';

const plain = (data) => {
  const iter = (tree, acc) => {
    const result = tree
      .filter((node) => node.type !== 'unchanged')
      .flatMap((node) => {
        const currentKey = `${acc}.${node.name}`;
        // eslint-disable-next-line arrow-body-style
        const getValue = (val) => {
          if (_.isObject(val)) {
            return '[complex value]';
          } if (typeof val === 'string') {
            return `'${val}'`;
          }
          return val;
        };
        if (node.value === 'nested') {
          return (iter(node.children, currentKey));
        }
        switch (node.type) {
          case 'deleted':
            return `Property '${currentKey.slice(1)}' was removed`;
          case 'added':
            return `Property '${currentKey.slice(1)}' was added with value: ${getValue(node.value)}`;
          case 'changed':
            return `Property '${currentKey.slice(1)}' was updated. From ${getValue(node.valueBefore)} to ${getValue(node.valueAfter)}`;
          default:
            return null;
        }
      });
    return result.join('\n');
  };
  return iter(data, '');
};
export default plain;
