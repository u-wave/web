/* eslint-disable global-require */
const gulp = require('gulp');
const { env } = require('gulp-util');
const runSeq = require('run-sequence');
const webpack = require('webpack');

require('./tasks/js');
require('./tasks/serve');

gulp.task('set-watching', () => {
  env.watch = true;
});

gulp.task('start', (cb) => {
  runSeq('set-watching', 'serve', cb);
});

gulp.task('build', ['js:babel']);

gulp.task('default', ['build']);

gulp.task('prod', ['build'], (done) => {
  // Load this later because it adds require compile hooks.
  // Those don't need to run on the above imports.
  const wpConfig = require('./webpack.config');
  const compiler = webpack(wpConfig);

  compiler.run((err, stats) => {
    if (err) {
      compiler.purgeInputFileSystem();
      done(err);
    } else {
      process.stdout.write(stats.toString({
        colors: true,
      }));
      done();
    }
  });
});
