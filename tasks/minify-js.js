import { src, dest } from 'gulp';
import uglify from 'gulp-uglify';

export default function minifyJsTask() {
  return src('lib/out.js')
    .pipe(uglify())
    .pipe(dest('dist/'));
}
