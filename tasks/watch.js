const gulp = require('gulp');
const watch = require('gulp-watch');

gulp.task('watch', () => {
  watch('src/**/*.css', () => {
    gulp.start('css');
  });
  watch('src/index.html', () => {
    gulp.start('html');
  });
  watch('assets/**/*', () => {
    gulp.start('assets');
  });
  watch('src/**/*.js', () => {
    gulp.start('js:lint');
  });

  // Endless.
  return new Promise(() => {});
});
