import { src, dest } from 'gulp';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import when from 'gulp-if';
import postcss from 'gulp-postcss';
import autoprefix from 'autoprefixer';
import bem from 'postcss-bem';
import colorFunction from 'postcss-color-function';
import cssnano from 'cssnano';
import imports from 'postcss-import';
import nested from 'postcss-nested';
import reduceCalc from 'postcss-calc';
import variables from 'postcss-simple-vars';

export default function compileCssTask({ minify = false, 'source-maps': useSourceMaps = true }) {
  const processors = [
    imports(),
    variables(),
    bem(),
    nested(),
    colorFunction(),
    reduceCalc(),
    autoprefix({
      remove: false,
      browsers: [ 'last 2 versions' ]
    })
  ];

  if (minify) {
    processors.push(cssnano());
  }

  return src('src/**/*.css')
    .pipe(when(useSourceMaps, sourcemaps.init()))
      .pipe(concat('style.css'))
      .pipe(postcss(processors))
    .pipe(when(useSourceMaps, sourcemaps.write()))
    .pipe(dest('lib/'));
}
