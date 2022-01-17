import yaml from 'js-yaml';
import * as path from 'path';

const parser = (data, filepath) => {
  const extension = path.extname(filepath);
  if (extension === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};
export default parser;
