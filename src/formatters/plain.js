import _ from 'lodash';

const getValue = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return val;
};

const plain = (data) => {
  const iter = (tree, acc) => {
    const plainDiffLines = tree
      .filter((node) => node.type !== 'unchanged')
      .flatMap((node) => {
        const currentKey = `${acc}.${node.name}`;
        switch (node.type) {
          case 'nested':
            return iter(node.children, currentKey);
          case 'deleted':
            return `Property '${currentKey.slice(1)}' was removed`;
          case 'added':
            return `Property '${currentKey.slice(1)}' was added with value: ${getValue(node.value)}`;
          case 'changed':
            return `Property '${currentKey.slice(1)}' was updated. From ${getValue(node.valueBefore)} to ${getValue(node.valueAfter)}`;
          default:
            throw new Error(`Unknown type!: ${node.type}`);
        }
      });
    return plainDiffLines.join('\n');
  };
  return iter(data, '');
};
export default plain;
