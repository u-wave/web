/* eslint-disable global-require */
const gulp = require('gulp');
const webpack = require('webpack');
const rimraf = require('rimraf');
const env = require('./tasks/env');
const js = require('./tasks/js');
const serve = require('./tasks/serve');

function setWatching(done) {
  env.watch = true;
  done();
}

function cleanDist(done) {
  rimraf('dist/{public,middleware}', done);
}
function cleanEs(done) {
  rimraf('es', done);
}
function cleanLib(done) {
  rimraf('lib', done);
}
const clean = gulp.parallel(cleanDist, cleanEs, cleanLib);

const start = gulp.series(setWatching, serve.serve);

const build = gulp.parallel(js.locales, js.babel);

function prod(done) {
  // Load this later because it adds require compile hooks.
  // Those don't need to run on the above imports.
  const wpConfig = require('./webpack.config');
  const compiler = webpack(wpConfig);

  compiler.run((err, stats) => {
    if (err) {
      compiler.purgeInputFileSystem();
      done(err);
    } else {
      process.stdout.write(stats.toString({
        colors: true,
      }));
      done();
    }
  });
}

function middleware() {
  return gulp.src('lib/middleware/**')
    .pipe(gulp.dest('dist/middleware'));
}

module.exports = {
  setWatching,
  serve: serve.serve,
  start,
  build,
  clean,
  default: build,
  middleware: gulp.series(build, middleware),
  prod: gulp.series(cleanDist, build, gulp.parallel(prod, middleware)),
};
