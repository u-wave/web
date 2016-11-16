const del = require('del');

module.exports = function cleanCssTask() {
  return del([ 'public/app.css' ]);
};
