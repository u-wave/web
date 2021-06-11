import process from 'process';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

export default {
  ...argv,
  middlewareDir: new URL('../npm', import.meta.url).pathname,
};

