import { src, dest } from 'gulp';
import cssnano from 'gulp-cssnano';

export default function minifyCssTask() {
  return src('lib/style.css')
    .pipe(cssnano())
    .pipe(dest('dist/'));
}
