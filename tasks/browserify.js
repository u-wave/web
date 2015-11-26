import { dest } from 'gulp';
import { buildExternalHelpers } from 'babel-core';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'gulp-buffer';
import collapse from 'bundle-collapser/plugin';
import envify from 'envify/custom';
import { transform as insert } from 'gulp-insert';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import when from 'gulp-if';

export default function browserifyTask({ minify = false, 'source-maps': useSourceMaps = true }) {
  const b = browserify({
    debug: useSourceMaps,
    entries: './src/app.js'
  });

  b.transform(babelify, {
    stage: 0,
    externalHelpers: true,
    optional: minify ? [ 'optimisation.react.constantElements' ] : []
  });
  b.transform(envify({
    _: 'purge',
    NODE_ENV: minify ? 'production' : 'development'
  }), { global: true });

  if (minify) {
    b.plugin(collapse);
  }

  const helpers = {};
  function maybeAddExternalHelpersHandler(tr) {
    if (tr instanceof babelify) {
      tr.once('babelify', ({ metadata }) => {
        metadata.usedHelpers.forEach(helper => {
          helpers[helper] = true;
        });
      });
    }
  }

  function getHelpers() {
    return `${buildExternalHelpers(Object.keys(helpers), 'var')}`;
  }

  return b
    .on('transform', maybeAddExternalHelpersHandler)
    .bundle()
    .pipe(source('out.js'))
    .pipe(buffer())
    .pipe(when(useSourceMaps, sourcemaps.init({ loadMaps: true })))
      .pipe(insert(contents => `${getHelpers()}; \n ${contents}`))
      .pipe(when(minify, uglify({
        compress: { screw_ie8: true },
        output: { screw_ie8: true },
        mangle: { toplevel: true }
      })))
    .pipe(when(useSourceMaps, sourcemaps.write()))
    .pipe(dest('lib/'));
}
