import { dest } from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'gulp-buffer';
import envify from 'envify/custom';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import when from 'gulp-if';

export default function browserifyTask({ minify = false }) {
  return browserify({
    debug: !minify,
    entries: './src/js/app.js'
  })
    .transform(babelify, { stage: 0 })
    .transform(envify({
      _: 'purge',
      NODE_ENV: minify ? 'production' : 'development'
    }), { global: true })
    .bundle()
    .pipe(source('out.js'))
    .pipe(when(minify, buffer()))
    .pipe(when(minify, uglify({ compress: { screw_ie8: true }, output: { screw_ie8: true } })))
    .pipe(dest('lib/'));
}
