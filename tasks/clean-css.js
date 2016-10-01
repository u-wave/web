import del from 'del';

export default function cleanCssTask() {
  return del([ 'public/app.css' ]);
}
