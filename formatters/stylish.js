import _ from 'lodash';

const stylish = (data, replacer = '  ', spacesCount = 1) => {
  const iter = (tree, depth) => {
    if (tree === null) {
      return null;
    }
    if (typeof tree !== 'object') {
      return tree.toString();
    }
    const indentSize = spacesCount * depth;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    // eslint-disable-next-line consistent-return
    const getTypeSign = (type) => {
      if (type === 'deleted') {
        return '- ';
      } if (type === 'added') {
        return '+ ';
      }
      return '  ';
    };
    if (_.isObject(tree) && !Array.isArray(tree)) {
      const lines = Object
        .entries(tree)
        .map(([key, val]) => `${currentIndent}  ${key}: ${iter(val, depth + 2)}`);
      return ['{', ...lines, `${bracketIndent}}`].join('\n');
    }
    const result = tree.map((node) => {
      if (node.type === 'changed') {
        return `${currentIndent}- ${node.name}: ${iter(node.valueBefore, depth + 2)}\n${currentIndent}+ ${node.name}: ${iter(node.valueAfter, depth + 2)}`;
      }
      if (node.value !== 'nested') {
        return `${currentIndent}${getTypeSign(node.type)}${node.name}: ${iter(node.value, depth + 2)}`;
      }
      return `${currentIndent}${getTypeSign(node.type)}${node.name}: ${iter(node.children, (depth + 2))}`;
    });
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };
  return iter(data, 1);
};
export default stylish;
