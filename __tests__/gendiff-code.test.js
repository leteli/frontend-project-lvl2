import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/gendiff-code.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('stylish diff for nested structures json yml', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(readFile('stylish-diff.txt'));
});

test('plain diff', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(readFile('plain-diff.txt'));
});

test('json diff', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(readFile('json-diff.json'));
});
