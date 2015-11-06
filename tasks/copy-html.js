import { src, dest } from 'gulp';
import minifyHtml from 'gulp-minify-html';
import when from 'gulp-if';

export default function copyHtmlTask({ minify = false }) {
  return src('src/index.html')
    .pipe(when(minify, minifyHtml()))
    .pipe(dest('lib/'));
}
