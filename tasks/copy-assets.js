import { src, dest } from 'gulp';

export default function copyAssetsTask() {
  return src('assets/**/*')
    .pipe(dest('lib/assets/'));
}
