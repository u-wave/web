import gulp from 'gulp';
import seq from 'run-sequence';

gulp.task('assets:favicon', () =>
  gulp.src('assets/favicon.ico')
    .pipe(gulp.dest('public/'))
);

gulp.task('assets:copy', () =>
  gulp.src('assets/**/*')
    .pipe(gulp.dest('public/assets/'))
);

export default function copyAssetsTask() {
  return new Promise((resolve, reject) =>
    seq([ 'assets:copy', 'assets:favicon' ], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  );
}
