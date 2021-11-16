'use strict';

module.exports = {
  plugins: [
    // TODO replace by postcss-preset-env when its next release is out
    ['postcss-preset-env', {
      importFrom: './src/vars.css',
      features: {
        'nesting-rules': true,
        // For `float: inline-start` support in chrome
        'logical-properties-and-values': true,
      },
    }],

    // TODO remove uses of color-mod(), as it is not going to be standardised
    'postcss-color-mod-function',
  ],
};
