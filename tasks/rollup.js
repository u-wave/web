import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import * as fs from 'fs';
import * as path from 'path';
import { dependencies } from '../package.json';

export default function rollupTask({ minify = false }) {
  process.env.NODE_ENV = minify ? 'production' : 'development';

  const babelrc = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../.babelrc'))
  );
  babelrc.presets[0] = [ 'es2015', { modules: false } ];
  babelrc.plugins.push('external-helpers');

  return rollup({
    entry: 'src/app.js',
    plugins: [
      babel({
        ...babelrc,
        babelrc: false,
        include: 'src/**/*.js'
      }),
      resolve({
        jsnext: false,
        main: true,
        browser: true,
        preferBuiltins: true,
        extensions: [ '.js' ]
      })
    ],
    external(id) {
      return id.split('/')[0] in dependencies || /\.yaml$/.test(id);
    }
  }).then(bundle => bundle.write({
    format: 'cjs',
    dest: 'lib/rollup.js'
  }));
}
