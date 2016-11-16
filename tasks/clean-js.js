const del = require('del');

module.exports = function cleanJsTask() {
  return del([ 'public/app.js' ]);
};
