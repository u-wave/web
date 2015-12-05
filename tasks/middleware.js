import gulp from 'gulp';
import babel from 'gulp-babel';

export default function middlewareTask() {
  return gulp.src('src/middleware.js')
    .pipe(babel())
    .pipe(gulp.dest('lib/'));
}
