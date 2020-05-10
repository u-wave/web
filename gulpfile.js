/* eslint-disable global-require */
const gulp = require('gulp');
const path = require('path');
const { promisify } = require('util');
const webpack = require('webpack');
const rimraf = require('rimraf');
const env = require('./tasks/env');
const serve = require('./tasks/serve');

const middlewareDir = path.join(__dirname, 'packages/u-wave-web-middleware');

function setWatching(done) {
  env.watch = true;
  done();
}

function clean(done) {
  rimraf(`${middlewareDir}/{public,middleware}`, done);
}

const start = gulp.series(setWatching, serve.serve);

async function prod() {
  // Load this later because it adds require compile hooks.
  // Those don't need to run on the above imports.
  const wpConfig = require('./webpack.config')({
    production: process.env.NODE_ENV === 'production',
  }, {});
  const compiler = webpack(wpConfig);
  const run = promisify(compiler.run.bind(compiler));
  const close = promisify(compiler.close.bind(compiler));

  let stats;
  try {
    stats = await run();
  } catch (err) {
    compiler.purgeInputFileSystem();
    throw err;
  } finally {
    await close();
  }

  process.stdout.write(stats.toString({
    colors: true,
  }));

  if (stats.hasErrors()) {
    throw new Error('There were errors');
  }
}

module.exports = {
  setWatching,
  serve: serve.serve,
  start,
  clean,
  prod: gulp.series(clean, prod),
};
