import * as fs from 'fs';
import * as path from 'path';
import parser from './parsers.js';
import chooseFormatter from './formatters/index.js';
import buildDiffTree from './diff-tree.js';

const getPath = (filename) => path.resolve('__fixtures__', filename);

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(getPath(filepath1));
  const data2 = readFile(getPath(filepath2));
  const format1 = path.extname(filepath1).slice(1);
  const format2 = path.extname(filepath2).slice(1);
  const parsedObj1 = parser(data1, format1);
  const parsedObj2 = parser(data2, format2);
  const tree = buildDiffTree(parsedObj1, parsedObj2);
  return chooseFormatter(tree, formatName);
};
export default genDiff;
