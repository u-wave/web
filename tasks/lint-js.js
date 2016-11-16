const exec = require('child_process').exec;
const npmRunPath = require('npm-run-path');

module.exports = function lintJsTask() {
  return new Promise((resolve, reject) => {
    const env = npmRunPath.env();
    exec('eslint --cache --color .', { env }, (error, stdout) => {
      if (error) {
        console.error(stdout);
        reject(error);
        return;
      }
      resolve();
    });
  });
};
