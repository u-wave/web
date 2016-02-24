import { src } from 'gulp';
import eslint from 'gulp-eslint';

export default function lintJsTask() {
  return src([ 'src/**/*.js', 'gulpfile.babel.js', 'tasks/**/*.js', 'test/**/*.js' ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
