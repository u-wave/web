'use strict';

module.exports = {
  plugins: [
    // TODO replace by postcss-preset-env when its next release is out
    'autoprefixer',
    'postcss-nesting',
    'postcss-logical',
    'postcss-dir-pseudo-class',

    // TODO remove uses of color-mod(), as it is not going to be standardised
    'postcss-color-mod-function',
  ],
};
