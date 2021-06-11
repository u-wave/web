'use strict';

const ejs = require('ejs');

module.exports = function ejsLoader(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  const template = ejs.compile(source, {
    async: true,
    client: true,
  });
  return `module.exports = ${template.toString()};`;
};
