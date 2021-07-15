'use strict';

const vm = require('vm');
const assert = require('assert');
const h = require('react').createElement;
const webpack = require('webpack');
const prerender = require('./prerender.cjs');

const {
  ExternalsPlugin,
  LibraryTemplatePlugin,
  LoaderTargetPlugin,
  EntryPlugin,
} = webpack;
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

module.exports = async function renderLoadingScreen(compilation) {
  const compiler = compilation.createChildCompiler('PrerenderLoadingScreen', {
    filename: '__loading-[name].js',
  });

  // Compile the template to nodejs javascript
  new NodeTemplatePlugin().apply(compiler);
  new NodeTargetPlugin().apply(compiler);
  new LibraryTemplatePlugin(null, 'commonjs').apply(compiler);
  new LoaderTargetPlugin('node').apply(compiler);

  // These are dependencies that must be loaded from the environment instead of from the
  // bundle to make our prerendering work.
  const sharedDependencies = ['react', 'react-dom', '@emotion'];
  new ExternalsPlugin('commonjs', ({ request }, callback) => {
    if (sharedDependencies.some((dep) => request === dep || request.startsWith(`${dep}/`))) {
      callback(null, `commonjs ${request}`);
    } else {
      callback();
    }
  }).apply(compiler);

  const inputPath = require.resolve('../../src/components/LoadingScreen');
  new EntryPlugin(compiler.context, inputPath, 'LoadingScreen').apply(compiler);

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
