import { dest } from 'gulp';
import { configure as babelify } from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';

export default function browserifyTask() {
  return browserify({
    debug: true,
    entries: './src/js/app.js'
  })
    .transform(babelify({ stage: 0 }))
    .bundle()
    .pipe(source('out.js'))
    .pipe(dest('lib/'));
}
