import { env, stdout } from 'process';
import { promisify } from 'util';
import webpack from 'webpack';
import getConfig from '../webpack.config.mjs';

const wpConfig = getConfig({
  production: env.NODE_ENV === 'production',
}, {
  profiling: env.PROFILING === '1',
  analyze: env.ANALYZE,
  demo: env.DEMO === '1',
  dualBundles: env.MODULES === '1',
});
const compiler = webpack(wpConfig);
const run = promisify(compiler.run.bind(compiler));
const close = promisify(compiler.close.bind(compiler));

let stats;
try {
  stats = await run();
} catch (err) {
  compiler.purgeInputFileSystem();
  throw err;
} finally {
  await close();
}

stdout.write(stats.toString({
  colors: true,
}));

if (stats.hasErrors()) {
  throw new Error('There were errors');
}
