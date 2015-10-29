import { dest } from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'gulp-buffer';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import when from 'gulp-if';

export default function browserifyTask({ minify = false }) {
  return browserify({
    debug: !minify,
    entries: './src/js/app.js'
  })
    .transform(babelify, { stage: 0 })
    .bundle()
    .pipe(source('out.js'))
    .pipe(when(minify, buffer()))
    .pipe(when(minify, uglify()))
    .pipe(dest('lib/'));
}
