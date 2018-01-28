const gulp = require('gulp');
const { log } = require('gulp-util');

gulp.task('apiServer', (done) => {
  const nodemon = require('nodemon');
  const devServer = require.resolve('u-wave-api-v1/dev/u-wave-api-dev-server');

  const watcher = nodemon({
    script: devServer,
  });
  watcher.on('start', () => done());
});
