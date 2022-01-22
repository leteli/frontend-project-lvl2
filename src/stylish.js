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
    if (_.isObject(tree) && !Array.isArray(tree)) {
      const lines = Object
        .entries(tree)
        .map(([key, val]) => `${currentIndent}  ${key}: ${iter(val, depth + 2)}`);
      return ['{', ...lines, `${bracketIndent}}`].join('\n');
    }
    const result = tree.map((node) => {
      let typeSign;
      switch (node.type) {
        case 'deleted':
          typeSign = '- ';
          break;
        case 'added':
          typeSign = '+ ';
          break;
        case 'unchanged':
          typeSign = '  ';
          break;
        default:
          typeSign = '  ';
          break;
      }
      if (node.value !== 'nested') {
        return `${currentIndent}${typeSign}${node.name}: ${iter(node.value, depth + 2)}`;
      }
      return `${currentIndent}${typeSign}${node.name}: ${iter(node.children, (depth + 2))}`;
    });
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };
  return iter(data, 1);
};
export default stylish;
