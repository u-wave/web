import del from 'del';

export default function cleanTask() {
  return del('lib');
}
