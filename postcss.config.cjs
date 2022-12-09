'use strict';

const presetEnv = require('postcss-preset-env');

const preset = presetEnv({
  features: {
    'nesting-rules': true,
    // For `float: inline-start` support in chrome
    'logical-properties-and-values': true,
  },
});

module.exports = {
  plugins: [{
    postcssPlugin: 'u-wave-preset-env',
    prepare(result) {
      // CSS inside HTML files is prerendered by emotion,
      // so it is already transpiled.
      if (result.opts.from.includes('html-proxy')) {
        return null;
      }
      return preset;
    },
  }],
};
