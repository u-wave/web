import del from 'del';

export default function cleanJsTask() {
  return del([ 'lib/js', 'lib/out.js' ]);
}
