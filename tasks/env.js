const path = require('path');

module.exports = {
  ...require('minimist')(process.argv.slice(2)),
  middlewareDir: path.join(__dirname, '../packages/u-wave-web-middleware'),
};
