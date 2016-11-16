const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const bem = require('postcss-bem');
const cssnano = require('cssnano');
const imports = require('postcss-import');
const env = require('gulp-util').env;
const del = require('del');

gulp.task('css:clean', () =>
  del([ 'public/app.css' ])
);

gulp.task('css', () => {
  const processors = [
    imports(),
    bem(),
    cssnext()
  ];

  if (env.minify) {
    processors.push(cssnano({ autoprefixer: false }));
  }

  return gulp.src('src/app.css')
    .pipe(sourcemaps.init())
      .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/'));
});
