import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { genDiff } from '../src/gendiff-code.js';
import stylish from '../src/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('formatted diff for nested structures 2 json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(stylish(genDiff(filepath1, filepath2))).toEqual(readFile('diff1.txt'));
});

test('formatted diff for nested structures json yml', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.yml');
  expect(stylish(genDiff(filepath1, filepath2))).toEqual(readFile('diff1.txt'));
});
