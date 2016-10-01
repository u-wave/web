import { src, dest } from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefix from 'autoprefixer';
import bem from 'postcss-bem';
import colorFunction from 'postcss-color-function';
import cssnano from 'cssnano';
import imports from 'postcss-import';
import nested from 'postcss-nested';
import reduceCalc from 'postcss-calc';
import variables from 'postcss-simple-vars';

export default function compileCssTask({ minify = false }) {
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

  return src('src/app.css')
    .pipe(sourcemaps.init())
      .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('public/'));
}
