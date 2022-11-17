'use strict';

const vm = require('vm');
const assert = require('assert');
const h = require('react').createElement;
const webpack = require('webpack');
const prerender = require('./prerender.cjs');

const {
  ExternalsPlugin,
  LoaderTargetPlugin,
  EntryPlugin,
} = webpack;
const { EnableLibraryPlugin } = webpack.library;
const { NodeTemplatePlugin, NodeTargetPlugin } = webpack.node;

function evalModule(code) {
  const target = { exports: {} };
  vm.runInNewContext(code, {
    // The URL global is not made available in new contexts by default.
    URL,
    require,
    __filename,
    module: target,
    exports: target.exports,
  });
  return target.exports;
}

/** @param {import('webpack').Compilation} compilation */
module.exports = async function renderLoadingScreen(compilation) {
  const externalDependencies = ['react', 'react-dom', '@emotion', '@mui'];

  const inputPath = require.resolve('../../src/components/LoadingScreen');
  const compiler = compilation.createChildCompiler('PrerenderLoadingScreen', {
    filename: '__loading-[name].js',
    library: {
      type: 'commonjs-module',
    },
  }, [
    new EntryPlugin(compilation.compiler.context, inputPath, 'LoadingScreen'),

    // Compile the template to nodejs javascript
    new NodeTemplatePlugin(),
    new NodeTargetPlugin(),
    new EnableLibraryPlugin('commonjs-module'),
    new LoaderTargetPlugin('node'),

    new ExternalsPlugin('commonjs', ({ request }, callback) => {
      if (externalDependencies.some((dep) => request === dep || request.startsWith(`${dep}/`))) {
        callback(null, `commonjs ${request}`);
      } else {
        callback();
      }
    }),
  ]);

  const [entries, childCompilation] = await new Promise((resolve, reject) => {
    compiler.runAsChild((err, ...results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

  const mainChunk = entries[0];
  const mainJsFiles = Array.from(mainChunk.files).filter((f) => f.endsWith('.js'));
  assert.strictEqual(mainJsFiles.length, 1, 'Loading screen build must output a single file.');
  const mainAsset = childCompilation.assets[mainJsFiles[0]];
  mainChunk.files.forEach((file) => {
    compilation.deleteAsset(file);
  });

  const code = mainAsset.source();
  const LoadingScreen = evalModule(code).default;

  return prerender(h(LoadingScreen));
};
