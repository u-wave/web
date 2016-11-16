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
  process.env.NODE_ENV = 'production';

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
    .pipe(gulp.dest(destCommonjs));
};
