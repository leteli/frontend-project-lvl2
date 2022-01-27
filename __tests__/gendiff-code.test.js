import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/gendiff-code.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test.each([
  ['file1.json', 'file2.yml', 'stylish', 'stylish-diff.txt'],
  ['file1.yml', 'file2.json', 'plain', 'plain-diff.txt'],
  ['file1.json', 'file2.json', 'json', 'json-diff.json'],
])('gendiff in 3 formats', (file1, file2, format, diff) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), format)).toEqual(readFile(diff));
});
