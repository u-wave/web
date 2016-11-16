const gulp = require('gulp');
const colors = require('gulp-util').colors;
const log = require('gulp-util').log;
const babel = require('gulp-babel');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const through = require('through2');
const relative = require('path').relative;

const src = 'src/**/*.js';
const destEs = 'es/';
const destCommonjs = 'lib/';

module.exports = function babelTask() {
  // We'll always compile this in production mode so other people using the
  // client as a library get the optimised versions of components.
  // Save the environment value so we can restore it later.
  const oldEnv = process.env.BABEL_ENV;
  process.env.BABEL_ENV = 'production';

  return gulp.src(src)
    .pipe(plumber())
    .pipe(newer(destEs))
    .pipe(through.obj((file, enc, cb) => {
      const path = relative(`${__dirname}/../`, file.path);
      log(`Compiling '${colors.cyan(path)}'...`);
      cb(null, file);
    }))
    .pipe(babel())
    .pipe(gulp.dest(destEs))
    .pipe(babel({
      babelrc: false,
      plugins: [ 'transform-es2015-modules-commonjs' ]
    }))
    .pipe(gulp.dest(destCommonjs))
    .on('end', () => {
      process.env.BABEL_ENV = oldEnv;
    });
};
