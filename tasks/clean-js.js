import del from 'del';

export default function cleanJsTask() {
  return del([ 'public/app.js' ]);
}
