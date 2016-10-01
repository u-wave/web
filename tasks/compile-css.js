import { src, dest } from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import bem from 'postcss-bem';
import cssnano from 'cssnano';
import imports from 'postcss-import';

export default function compileCssTask({ minify = false }) {
  const processors = [
    imports(),
    bem(),
    cssnext()
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
