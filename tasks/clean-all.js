const del = require('del');

// Remove all of the compiled things!

module.exports = function cleanTask() {
  return del('lib');
};
