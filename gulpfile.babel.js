import gulp from 'gulp';
import { env } from 'gulp-util';

function exec(taskName) {
  return () => require(`./tasks/${taskName}`)(env);
}

gulp.task('postcss', exec('compile-css'));
gulp.task('css', [ 'postcss' ], exec('concat-css'));
gulp.task('min-css', [ 'css' ], exec('minify-css'));

gulp.task('eslint', exec('lint-js'));
gulp.task('browserify', [ 'eslint' ], exec('browserify'));
gulp.task('js', [ 'browserify' ]);
gulp.task('min-js', [ 'js' ], exec('minify-js'));

gulp.task('assets', exec('copy-assets'));

gulp.task('dist', [ 'min-js', 'min-css' ], exec('make-dist'));

gulp.task('watch', exec('watch'));

gulp.task('default', [ 'assets', 'js', 'css' ]);
