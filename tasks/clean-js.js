import del from 'del';

export default function cleanJsTask() {
  return del([ 'lib/js/**/*.js', 'lib/out.js' ]);
}
