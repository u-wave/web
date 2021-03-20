'use strict';

const { promisify } = require('util');
const webpack = require('webpack');
const getConfig = require('../webpack.config');

async function prod() {
  const wpConfig = getConfig({
    production: process.env.NODE_ENV === 'production',
  }, {
    profiling: process.env.PROFILING === '1',
    analyze: process.env.ANALYZE,
    demo: process.env.DEMO === '1',
    dualBundles: process.env.MODULES === '1',
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

  process.stdout.write(stats.toString({
    colors: true,
  }));

  if (stats.hasErrors()) {
    throw new Error('There were errors');
  }
}

prod().catch((error) => {
  console.error(error.stack);
  process.exit(1);
});
