import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

// eslint-disable-next-line consistent-return
const chooseFormatter = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    default:
      throw new Error(`Unknown format!: ${formatName}`);
  }
};
export default chooseFormatter;
