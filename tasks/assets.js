const gulp = require('gulp');
const gulpif = require('gulp-if');
const env = require('gulp-util').env;
const newer = require('gulp-newer');
const optimizeImage = require('gulp-image');
const seq = require('run-sequence');

gulp.task('assets:favicon', () =>
  gulp.src('assets/favicon.ico')
    .pipe(gulp.dest('public/'))
);

gulp.task('assets:copy', () =>
  gulp.src([ 'assets/**/*', '!assets/screenshot.png' ])
    .pipe(newer('public/assets/'))
    .pipe(gulpif(env.minify, optimizeImage()))
    .pipe(gulp.dest('public/assets/'))
);

gulp.task('assets', () => (
  new Promise((resolve, reject) => {
    seq([ 'assets:copy', 'assets:favicon' ], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
));
