const gulp = require('gulp');
const seq = require('run-sequence');

gulp.task('assets:favicon', () =>
  gulp.src('assets/favicon.ico')
    .pipe(gulp.dest('public/'))
);

gulp.task('assets:copy', () =>
  gulp.src('assets/**/*')
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
