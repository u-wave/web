import { src } from 'gulp';
import eslint from 'gulp-eslint';

export default function lintJsTask() {
  return src([ 'src/js/**/*.js', 'gulpfile.babel.js' ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
