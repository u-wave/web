import { src, dest } from 'gulp';
import concat from 'gulp-concat';

export default function concatCssTask() {
  return src('lib/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(dest('lib/'));
}
