'use strict';

const path = require('path');

module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': true,
        // Force enable custom properties so they can be used in color-mod()
        // function calls even if the target browser does not support them.
        'custom-properties': {
          preserve: true,
          importFrom: path.join(__dirname, 'src/vars.css'),
        },
        'color-mod-function': {
          unresolved: 'warn',
        },
      },
    },
  },
};
