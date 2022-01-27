import _ from 'lodash';

const getTypeSign = (type) => {
  switch (type) {
    case 'deleted':
      return '- ';
    case 'added':
      return '+ ';
    default:
      return '  ';
  }
};

const getValue = (value, indent, depth = 1) => {
  if (_.isPlainObject(value)) {
    const replacer = '    ';
    const spacesCount = 1;
    const indentSize = spacesCount * depth;
    const objCurrentIndent = replacer.repeat(indentSize);
    const objBracketIndent = replacer.repeat(indentSize - spacesCount);
    const formattedEntries = Object
      .entries(value)
      .map(([key, val]) => `${indent}${objCurrentIndent}${key}: ${getValue(val, indent, depth + 1)}`);
    return ['{', ...formattedEntries, `${indent}${objBracketIndent}}`].join('\n  ');
  }
  return value;
};

const stylish = (data) => {
  const iter = (tree, depth) => {
    const replacer = '  ';
    const spacesCount = 1;
    const indentSize = spacesCount * depth;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const stylishDiffNodes = tree.map((node) => {
      if (node.type === 'changed') {
        return `${currentIndent}- ${node.name}: ${getValue(node.valueBefore, currentIndent)}\n${currentIndent}+ ${node.name}: ${getValue(node.valueAfter, currentIndent)}`;
      }
      if (node.type !== 'nested') {
        return `${currentIndent}${getTypeSign(node.type)}${node.name}: ${getValue(node.value, currentIndent)}`;
      }
      return `${currentIndent}${getTypeSign(node.type)}${node.name}: ${iter(node.children, (depth + 2))}`;
    });
    return ['{', ...stylishDiffNodes, `${bracketIndent}}`].join('\n');
  };
  return iter(data, 1);
};
export default stylish;
