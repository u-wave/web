'use strict';

const path = require('path');
const pkg = require('../../package.json');

// List of dependency paths that need to be compiled.
const es2015Deps = [
  /\/abortcontroller-polyfill\/src\//,
  /\/format-duration\//,
  /\/strip-indent\//,
  /\/escape-string-regex\//,
  /\/@material-ui\/core\/es\//,
  /\/@material-ui\/styles\/es\//,
  /\/@material-ui\/system\/es\//,
  /\/@material-ui\/utils\/es\//,
];

module.exports = function compileDependencies() {
  const babelConfig = {
    cacheDirectory: true,
    babelrc: false,
    presets: [
      ['@babel/preset-env', {
        modules: false,
        // Don't assume dependencies are OK with being run in loose mode
        loose: false,
      }],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        version: pkg.dependencies['@babel/runtime'],
        corejs: false,
      }],
    ],
  };

  babelConfig.cacheIdentifier = `
    ${process.env.BABEL_ENV || ''}
    ${process.env.NODE_ENV || ''}
    ${process.env.BROWSERSLIST || ''}
    ${JSON.stringify(babelConfig)}
  `;

  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: es2015Deps,
          use: [
            { loader: 'babel-loader', options: babelConfig },
          ],
        },
      ],
    },

    resolve: {
      alias: {
        '@material-ui/core': path.join(__dirname, '../../node_modules/@material-ui/core/es/'),
        '@material-ui/icons': path.join(__dirname, '../../node_modules/@material-ui/icons/esm/'),
        '@material-ui/styles': path.join(__dirname, '../../node_modules/@material-ui/styles/es/'),
        '@material-ui/system': path.join(__dirname, '../../node_modules/@material-ui/system/es/'),
        '@material-ui/utils': path.join(__dirname, '../../node_modules/@material-ui/utils/es/'),
      },
    },
  };
};
