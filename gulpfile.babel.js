import babel from 'babelify';
import browserify from 'browserify';
import concat from 'gulp-concat';
import cssnano from 'gulp-cssnano';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import { log } from 'gulp-util';
import merge from 'merge-stream';
import minifyHtml from 'gulp-minify-html';
import postcss from 'gulp-postcss';
import postcssAutoprefix from 'autoprefixer';
import postcssBem from 'postcss-bem';
import postcssHexa from 'postcss-color-hexa';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssVars from 'postcss-simple-vars';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import watchify from 'watchify';

gulp.task('postcss', () => {
  return gulp.src('src/css/**/*.css')
    .pipe(postcss([
      postcssImport(),
      postcssVars(),
      postcssBem(),
      postcssNested(),
      postcssHexa(),
      postcssAutoprefix({
        remove: false,
        browsers: [ 'last 2 versions' ]
      })
    ]))
    .pipe(gulp.dest('lib/css/'));
});

gulp.task('css', [ 'postcss' ], () => {
  return gulp.src('lib/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('lib/'));
});

gulp.task('eslint', () => {
  return gulp.src([ 'src/js/**/*.js', 'gulpfile.babel.js' ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

function makeBrowserify(opts = {}) {
  return browserify({
    ...opts,
    debug: true,
    entries: './src/js/app.js'
  })
    .transform(babel.configure({ stage: 0 }));
}

gulp.task('browserify', [ 'eslint' ], () => {
  return makeBrowserify()
    .bundle()
    .pipe(source('out.js'))
    .pipe(gulp.dest('lib/'));
});

gulp.task('watchify', () => {
  const wOpts = {
    cache: {},
    packageCache: {}
  };
  const w = watchify(makeBrowserify(wOpts));
  w.on('log', log.bind(null, 'watchify:'));

  function bundle() {
    w
      .bundle()
      .pipe(source('out.js'))
      .pipe(gulp.dest('lib/'));
  }
  w.on('update', bundle);
  bundle();
});

gulp.task('js', [ 'browserify' ]);

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

gulp.task('assets', () => {
  return gulp.src('assets/**/*')
    .pipe(gulp.dest('lib/assets/'));
});

gulp.task('dist', [ 'min-js', 'min-css' ], () => {
  return merge(
    gulp.src('lib/index.html')
      .pipe(minifyHtml())
      .pipe(gulp.dest('dist/')),
    gulp.src('lib/assets/**/*')
      .pipe(gulp.dest('dist/assets/'))
  );
});

gulp.task('watch', [ 'watchify' ], () => {
  gulp.watch([ 'src/js/**/*.js', 'gulpfile.babel.js' ], [ 'eslint' ]);
  gulp.watch('src/css/**/*.css', [ 'css' ]);
});

gulp.task('default', [ 'assets', 'js', 'css' ]);
