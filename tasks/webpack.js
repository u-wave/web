const webpack = require('webpack');

module.exports = function webpackTask({ minify = false }) {
  if (minify) {
    process.env.NODE_ENV = 'production';
  }

  const config = require('../webpack.config');

  return new Promise((resolve, reject) => {
    webpack(config, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
