const pkg = require('./package.json');

module.exports = (api, envOverride) => {
  const env = envOverride || process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
  // Command-line version override.
  const browsers = process.env.BROWSERSLIST;

  api.cache(() => `${env}${browsers || ''}`);

  // When the caller is @babel/register, we expect to immediately run the output, in the current Node.js version.
  const callerIsNode = api.caller(caller => caller && caller.name === '@babel/register');
  // When the target is `node`, we're doing a webpack build for server-side code. The output will run in any Node.js
  // version supported by our public API.
  const targetIsNode = api.caller(caller => caller && caller.target === 'node');
  // Check if our output should support older browsers.
  const targetIsLegacy = api.caller(caller => caller && caller.output && caller.output.ecmaVersion === 5);
  const targetIsModern = !targetIsLegacy;

  let targets = {};
  let bugfixes = false;
  if (callerIsNode) {
    targets = { node: 'current', browsers: '' };
  } else if (targetIsNode) {
    targets = { node: '10.0.0', browsers: '' };
  }

  if (targetIsModern) {
    targets = { esmodules: true, browsers: '' };
    bugfixes = true;
  }

  const preset = {
    presets: [
      ['@babel/preset-env', {
        modules: false,
        targets,
        bugfixes,
      }],
      ['@babel/preset-react', {
        development: env === 'development',
        // let preset-env transform ...spread if required
        useSpread: true,
      }],
    ],
    plugins: [
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-class-properties',
      ['@babel/plugin-transform-runtime', {
        version: pkg.dependencies['@babel/runtime'],
        // When targeting Node.js for any reason, dependencies are external to the webpack bundle,
        // and must be `require()`-able.
        useESModules: !callerIsNode && !targetIsNode,
        corejs: false,
      }],
    ],
  };

  if (env === 'production') {
    preset.plugins.push(
      '@babel/plugin-transform-react-constant-elements',
      '@babel/plugin-transform-react-inline-elements',
      ['transform-react-remove-prop-types', { mode: 'remove' }],
    );
  }

  if (env === 'development' && !targetIsNode && !callerIsNode) {
    preset.plugins.push(
      'module:react-refresh/babel',
    );
  }

  return preset;
};
