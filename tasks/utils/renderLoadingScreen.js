/* eslint-disable global-require */
const vm = require('vm');
const assert = require('assert');
const h = require('react').createElement;
const prerender = require('./prerender');
const pkg = require('../../package.json');

function evalModule(code) {
  const target = {};
  vm.runInNewContext(code, {
    require,
    module: target,
  });
  return target.exports;
}

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
    if (dependencies.some((dep) => request === dep || request.startsWith(`${dep}/`))) {
      callback(null, `commonjs ${request}`);
    } else {
      callback();
    }
  }).apply(compiler);

  const inputPath = require.resolve('../../src/components/LoadingScreen');
  new SingleEntryPlugin(compiler.context, inputPath, 'LoadingScreen').apply(compiler);

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
  const mainJsFiles = mainChunk.files.filter((f) => f.endsWith('.js'));
  assert.strictEqual(mainJsFiles.length, 1, 'Loading screen build must output a single file.');
  const mainAsset = childCompilation.assets[mainJsFiles[0]];
  mainChunk.files.forEach((file) => {
    delete childCompilation.assets[file];
  });

  const code = mainAsset.source();
  const LoadingScreen = evalModule(code).default;
  return prerender(h(LoadingScreen));
};
