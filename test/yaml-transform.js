'use strict';

const yaml = require('js-yaml');

exports.process = (src) => {
  const json = yaml.safeLoad(src);
  return `module.exports = ${JSON.stringify(json)};`;
};
