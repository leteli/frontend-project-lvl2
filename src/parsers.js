import yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

const getPath = (filename) => path.resolve('__fixtures__', filename);

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

const parser = (filepath) => {
  const data = readFile(getPath(filepath));
  const extension = path.extname(filepath);
  if (extension === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};
export default parser;
