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

  const preset = {
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
      ['@babel/preset-react', {
        development: env === 'development',
        runtime: 'automatic',
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
  };

  if (targets) {
    preset.targets = targets;
  }

  if (callerIsNode) {
    preset.plugins.push(
      '@babel/plugin-transform-modules-commonjs',
      'module:babel-plugin-dynamic-import-node',
    );
  }

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

  if (callerIsNode) {
    preset.plugins.push(importMetaToCommonJs);
  }

  return preset;
};
