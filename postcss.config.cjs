'use strict';

module.exports = {
  plugins: [
    ['postcss-preset-env', {
      importFrom: './src/vars.css',
      features: {
        'nesting-rules': true,
        // For `float: inline-start` support in chrome
        'logical-properties-and-values': true,
      },
    }],
  ],
};
