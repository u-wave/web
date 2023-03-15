'use strict';

const pkg = require('./package.json');

// Replaces import.meta.url with a CommonJS equivalent, and import.meta.* with `undefined`.
function importMetaToCommonJs() {
  return {
    visitor: {
      MetaProperty(path) {
        if (path.node.property.name !== 'meta') {
          return;
        }
        const parent = path.parentPath;
        if (!parent.isMemberExpression()) {
          return;
        }

        if (parent.node.property.name === 'url') {
          parent.replaceWithSourceString('require("url").pathToFileURL(__filename)');
        } else {
          parent.replaceWithSourceString('undefined');
        }
      },
    },
  };
}

module.exports = (api, envOverride) => {
  const env = envOverride || process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
  // Command-line version override.
  const browsers = process.env.BROWSERSLIST;

  api.cache(() => `${env}${browsers || ''}`);

  // When the caller is @babel/register, we expect to immediately run the output, in the current
  // Node.js version.
  const callerIsNode = api.caller((caller) => caller && (caller.name === '@babel/register' || caller.name === 'babel-jest'));
  // When the target is `node`, we're doing a webpack build for server-side code. The output will
  // run in any Node.js version supported by our public API.
  const targetIsNode = api.caller((caller) => caller && caller.target === 'node');
  // Check if our output should support older browsers.
  const targetIsLegacy = api.caller((caller) => caller && caller.compiler === 'app-legacy');

  let browserslistEnv = 'production';
  let targets;
  if (callerIsNode) {
    targets = { node: 'current', browsers: '' };
  } else if (targetIsNode) {
    targets = { node: '12.0.0', browsers: '' };
  }

  if (targetIsLegacy) {
    browserslistEnv = 'legacy';
  }

  const tsConfig = {
    test: /\.tsx?$/,
    presets: [
      '@babel/preset-typescript',
    ],
    plugins: [],
  };

  const reactConfig = {
    test: /\.[jt]sx$/,
    presets: [
      ['@babel/preset-react', {
        development: env === 'development',
        runtime: 'automatic',
      }],
    ],
    plugins: [],
  };

  const config = {
    browserslistEnv,
    assumptions: {
      constantSuper: true,
      noClassCalls: true,
      noDocumentAll: true,
      noNewArrows: true,
      privateFieldsAsProperties: true,
    },
    presets: [
      ['@babel/preset-env', {
        modules: false,
        bugfixes: true,
      }],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        version: pkg.dependencies['@babel/runtime'],
        // When targeting Node.js for any reason, dependencies are external to the webpack bundle,
        // and must be `require()`-able.
        useESModules: !callerIsNode && !targetIsNode,
        corejs: false,
      }],
    ],

    overrides: [tsConfig, reactConfig],
  };

  if (targets) {
    config.targets = targets;
  }

  if (callerIsNode) {
    config.plugins.push(
      '@babel/plugin-transform-modules-commonjs',
    );
  }

  if (env === 'production') {
    reactConfig.plugins.push(
      '@babel/plugin-transform-react-constant-elements',
      '@babel/plugin-transform-react-inline-elements',
      ['transform-react-remove-prop-types', { mode: 'remove' }],
    );
  }

  if (env === 'development' && !targetIsNode && !callerIsNode) {
    reactConfig.plugins.push(
      'module:react-refresh/babel',
    );
  }

  if (callerIsNode) {
    config.plugins.push(importMetaToCommonJs);
  }

  return config;
};
