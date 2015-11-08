import del from 'del';

export default function cleanCssTask() {
  return del([ 'lib/css', 'lib/style.css' ]);
}
