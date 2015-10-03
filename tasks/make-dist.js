import { src, dest } from 'gulp';
import merge from 'merge-stream';
import minifyHtml from 'gulp-minify-html';

export default function makeDistTask() {
  return merge(
    src('lib/index.html')
      .pipe(minifyHtml())
      .pipe(dest('dist/')),

    src('lib/assets/**/*')
      .pipe(dest('dist/assets/'))
  );
}
