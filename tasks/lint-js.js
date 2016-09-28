import { exec } from 'child_process';
import npmRunPath from 'npm-run-path';

export default function lintJsTask() {
  return new Promise((resolve, reject) => {
    const env = npmRunPath.env();
    exec('eslint --cache --color .', { env }, (error, stdout) => {
      if (error) {
        console.error(stdout);
        reject(error);
        return;
      }
      resolve();
    });
  });
}
