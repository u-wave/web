const gulp = require('gulp');
const gulpif = require('gulp-if');
const env = require('gulp-util').env;
const optimizeImage = require('gulp-image');
const seq = require('run-sequence');

gulp.task('assets:favicon', () =>
  gulp.src('assets/favicon.ico')
    .pipe(gulp.dest('public/'))
);

gulp.task('assets:copy', () =>
  gulp.src([ 'assets/**/*', '!assets/screenshot.png' ])
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
