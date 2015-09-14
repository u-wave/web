import babel from 'gulp-babel';
import browserify from 'browserify';
import concat from 'gulp-concat';
import cssnano from 'gulp-cssnano';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import minifyHtml from 'gulp-minify-html';
import postcss from 'gulp-postcss';
import postcssBem from 'postcss-bem';
import postcssNested from 'postcss-nested';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';

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

gulp.task('eslint', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('babel', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({ stage: 0 }))
    .pipe(gulp.dest('lib/js/'));
});

gulp.task('js', [ 'eslint', 'babel' ], () => {
  return browserify({
    debug: true,
    entries: './lib/js/app.js'
  })
    .bundle()
    .pipe(source('out.js'))
    .pipe(gulp.dest('lib/'));
});

gulp.task('min-css', [ 'css' ], () => {
  return gulp.src('lib/style.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/'));
});
gulp.task('min-js', [ 'js' ], () => {
  return gulp.src('lib/out.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('dist', [ 'min-js', 'min-css' ], () => {
  return gulp.src('lib/index.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', () => {
  gulp.watch('src/js/**/*.js', [ 'js' ]);
  gulp.watch('src/css/**/*.css', [ 'css' ]);
});

gulp.task('default', [ 'js', 'css' ]);
