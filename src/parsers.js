import yaml from 'js-yaml';

const parser = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extension!: ${extension}`);
  }
};
export default parser;
