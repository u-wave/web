const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const bem = require('postcss-bem');
const cssnano = require('cssnano');
const imports = require('postcss-import');

module.exports = function compileCssTask({ minify = false }) {
  const processors = [
    imports(),
    bem(),
    cssnext()
  ];

  if (minify) {
    processors.push(cssnano());
  }

  return gulp.src('src/app.css')
    .pipe(sourcemaps.init())
      .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/'));
};
