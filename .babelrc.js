const pkg = require('./package.json');

module.exports = (api, envOverride) => {
  const env = envOverride || process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
  // Command-line version override.
  const browsers = process.env.BROWSERSLIST;
  api.cache(() => `${env}${browsers || ''}`);

  const callerIsRollup = api.caller(caller => caller && caller.name === 'rollup-plugin-babel');
  const callerIsNode = api.caller(caller => caller && caller.name === '@babel/register');
  // Check if we're part of a `target: 'node'` webpack build.
  const targetIsNode = api.caller(caller => caller && caller.target === 'node');
  // Check if our output should support older browsers.
  const targetIsLegacy = api.caller(caller => caller && caller.output && caller.output.ecmaVersion === 5);
  const targetIsModern = !targetIsLegacy;

  const targets = {};
  if (callerIsNode) {
    targets.node = 'current';
    targets.browsers = '';
  }

  if (targetIsNode) {
    targets.node = '10.0.0';
    targets.browsers = '';
  }

  if (targetIsModern) {
    targets.esmodules = true;
    targets.browsers = '';
  }

  const preset = {
    presets: [
      ['@babel/preset-env', {
        modules: false,
        targets,
        bugfixes: true,
      }],
      ['@babel/preset-react', {
        development: env === 'development',
        // let preset-env transform ...spread if required
        useSpread: true,
      }],
    ],
    plugins: [
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-class-properties',
    ],
  };

  // Rollup handles Babel helpers well. If we're not using Rollup, use @babel/runtime for helpers.
  if (!callerIsRollup) {
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
      ['transform-react-remove-prop-types', { mode: 'remove' }],
    );
  }

  return preset;
};
