const gulp = require('gulp');
const watch = require('gulp-watch');

gulp.task('watch', () => {
  watch('assets/**/*', () => {
    gulp.start('assets');
  });
  watch('src/**/*.js', () => {
    gulp.start('js:lint');
  });

  // Endless.
  return new Promise(() => {});
});
