import babel from 'gulp-babel';
import browserify from 'browserify';
import concat from 'gulp-concat';
import gulp from 'gulp';
import postcss from 'gulp-postcss';
import postcssBem from 'postcss-bem';
import postcssNested from 'postcss-nested';
import source from 'vinyl-source-stream';

gulp.task('postcss', () => {
  return gulp.src('src/css/**/*.css')
    .pipe(postcss([ postcssBem(), postcssNested() ]))
    .pipe(gulp.dest('lib/css/'));
});

gulp.task('css', [ 'postcss' ], () => {
  return gulp.src('lib/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('lib/'));
});

gulp.task('babel', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({ stage: 0 }))
    .pipe(gulp.dest('lib/js/'));
});

gulp.task('js', [ 'babel' ], () => {
  return browserify({
    debug: true,
    entries: './lib/js/app.js'
  })
    .bundle()
    .pipe(source('out.js'))
    .pipe(gulp.dest('lib/'));
});

gulp.task('watch', () => {
  gulp.watch('src/js/**/*.js', [ 'js' ]);
  gulp.watch('src/css/**/*.css', [ 'css' ]);
});

gulp.task('default', [ 'js', 'css' ]);
