/* eslint-disable global-require */
const vm = require('vm');
const path = require('path');
const assert = require('assert');
const h = require('react').createElement;
const prerender = require('./prerender');
const pkg = require('../../package.json');

module.exports = async function renderLoadingScreen(compilation) {
  const NodeTemplatePlugin = require('webpack/lib/node/NodeTemplatePlugin');
  const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');
  const LoaderTargetPlugin = require('webpack/lib/LoaderTargetPlugin');
  const LibraryTemplatePlugin = require('webpack/lib/LibraryTemplatePlugin');
  const ExternalsPlugin = require('webpack/lib/ExternalsPlugin');
  const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

  const compiler = compilation.createChildCompiler('PrerenderLoadingScreen', {
    filename: '__loading-[name].js',
  });

  // Compile the template to nodejs javascript
  new NodeTemplatePlugin().apply(compiler);
  new NodeTargetPlugin().apply(compiler);
  new LibraryTemplatePlugin('LOADING_SCREEN', 'commonjs2').apply(compiler);
  new LoaderTargetPlugin('node').apply(compiler);
  const dependencies = Object.keys(pkg.dependencies);
  new ExternalsPlugin('commonjs', (context, request, callback) => {
    if (dependencies.some((dep) => request === dep || request.startsWith(dep + '/'))) {
      return callback(null, `commonjs ${request}`);
    }
    callback();
  }).apply(compiler);

  const inputPath = require.resolve('../../src/components/LoadingScreen');
  new SingleEntryPlugin(compiler.context, inputPath, 'LoadingScreen').apply(compiler);

  const [entries, childCompilation] = await new Promise((resolve, reject) => {
    compiler.runAsChild((err, entries, childCompilation) => {
      if (err) return reject(err);
      resolve([entries, childCompilation]);
    });
  });

  const mainChunk = entries[0];
  assert.strictEqual(mainChunk.files.length, 1, 'Loading screen build must output a single file.');
  const mainAsset = childCompilation.assets[mainChunk.files[0]];
  delete childCompilation.assets[mainChunk.files[0]];

  const code = mainAsset.source();
  const LoadingScreen = evalModule(code).default;
  return prerender(h(LoadingScreen));
};

function evalModule(code) {
  const target = {};
  vm.runInNewContext(code, {
    require,
    module: target,
  });
  return target.exports;
}
