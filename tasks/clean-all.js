import del from 'del';

// Remove all of the compiled things!

export default function cleanTask() {
  return del('lib');
}
