'use strict';

const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

module.exports = {
  ...argv,
  middlewareDir: path.join(__dirname, '../npm'),
};
