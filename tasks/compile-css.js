import { src, dest } from 'gulp';
import postcss from 'gulp-postcss';
import autoprefix from 'autoprefixer';
import bem from 'postcss-bem';
import colorFunction from 'postcss-color-function';
import cssnano from 'cssnano';
import imports from 'postcss-import';
import nested from 'postcss-nested';
import variables from 'postcss-simple-vars';

export default function compileCssTask({ minify = false }) {
  const processors = [
    imports(),
    variables(),
    bem(),
    nested(),
    colorFunction(),
    autoprefix({
      remove: false,
      browsers: [ 'last 2 versions' ]
    })
  ];
  if (minify) {
    processors.push(cssnano());
  }
  return src('src/**/*.css')
    .pipe(postcss(processors))
    .pipe(dest('lib/css/'));
}
