import del from 'del';

export default function cleanCssTask() {
  return del([ 'lib/css/**/*.css', 'lib/style.css' ]);
}
