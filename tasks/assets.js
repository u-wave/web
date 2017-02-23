const gulp = require('gulp');

gulp.task('assets', () =>
  gulp.src('assets/favicon.ico')
    .pipe(gulp.dest('public/'))
);
