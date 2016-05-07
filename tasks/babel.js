import gulp from 'gulp';
import { colors, log } from 'gulp-util';
import babel from 'gulp-babel';
import newer from 'gulp-newer';
import plumber from 'gulp-plumber';
import through from 'through2';
import { relative } from 'path';

const src = 'src/**/*.js';
const dest = 'lib/';

export default function babelTask() {
  process.env.NODE_ENV = 'production';

  return gulp.src(src)
    .pipe(plumber())
    .pipe(newer(dest))
    .pipe(through.obj((file, enc, cb) => {
      const path = relative(`${__dirname}/../`, file.path);
      log(`Compiling '${colors.cyan(path)}'...`);
      cb(null, file);
    }))
    .pipe(babel())
    .pipe(gulp.dest(dest));
}
