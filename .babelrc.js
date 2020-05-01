const pkg = require('./package.json');

module.exports = (api, envOverride) => {
  const env = envOverride || process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
  // Command-line version override.
  const browsers = process.env.BROWSERSLIST;
  api.cache(() => `${env}${browsers || ''}`);

  // Check if we're part of a `target: 'node'` webpack build.
  const targetIsNode = api.caller(caller => caller && caller.target === 'node');

  const targets = {};
  if (env === 'middleware' || targetIsNode) {
    targets.node = '10.0.0';
    targets.browsers = '';
  }
  if (env === 'testing') {
    targets.node = 'current';
    targets.browsers = '';
  }

  const preset = {
    presets: [
      ['@babel/preset-env', { modules: false, targets }],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-class-properties',
    ],
  };

  if (env !== 'middleware') {
    preset.plugins.push(
      ['@babel/plugin-transform-runtime', {
        version: pkg.dependencies['@babel/runtime'],
        corejs: false,
      }],
    );
  }

  if (env === 'development') {
    preset.plugins.push('module:react-hot-loader/babel');
  }

  if (env === 'production') {
    preset.plugins.push(
      '@babel/plugin-transform-react-constant-elements',
      '@babel/plugin-transform-react-inline-elements',
      ['transform-react-remove-prop-types', { mode: 'wrap' }],
    );
  }

  return preset;
};
