import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

// eslint-disable-next-line consistent-return
const chooseFormatter = (data, formatName) => {
  if (formatName === 'stylish') {
    return stylish(data);
  } if (formatName === 'plain') {
    return plain(data);
  }
  if (formatName === 'json') {
    return json(data);
  }
};
export default chooseFormatter;
