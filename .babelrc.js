const pkg = require('./package.json');

module.exports = (api, envOverride) => {
  const env = envOverride || process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
  // Command-line version override.
  const browsers = process.env.BROWSERSLIST;

  const isRollup = api.caller((caller) => caller.name === '@rollup/plugin-babel');
  api.cache(() => `${env}${browsers || ''}`);

  const targets = {};
  if (env === 'middleware') {
    targets.node = '8.9';
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
      'module:react-hot-loader/babel',
    ],
  };

  if (!isRollup) {
    preset.plugins.push(
      ['@babel/plugin-transform-runtime', {
        version: pkg.dependencies['@babel/runtime'],
        corejs: false,
      }],
    );
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
