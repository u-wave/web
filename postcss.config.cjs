'use strict';

const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    presetEnv({
      features: {
        'nesting-rules': true,
        // For `float: inline-start` support in chrome
        'logical-properties-and-values': true,
      },
    }),
  ],
};
