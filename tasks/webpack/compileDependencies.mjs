import { fileURLToPath } from 'url';
import * as fs from 'fs/promises';
import * as process from 'process';

const pkg = JSON.parse(await fs.readFile(new URL('../../package.json', import.meta.url), 'utf8'));

// List of dependency paths that need to be compiled.
const es2015Deps = [
  /\/abortcontroller-polyfill\/src\//,
  /\/escape-string-regexp\//,
  /\/is-plain-obj\//,
  /\/min-indent\//,
  /\/nanoid\//,
  /\/strip-indent\//,
  /\/@material-ui\/core\/modern\//,
  /\/@material-ui\/icons\//,
  /\/@material-ui\/system\/modern\//,
  /\/@material-ui\/utils\/modern\//,
];

export default function compileDependencies() {
  const babelConfig = {
    cacheDirectory: true,
    babelrc: false,
    presets: [
      ['@babel/preset-env', {
        modules: false,
        // Don't assume dependencies are OK with being run in loose mode
        loose: false,
      }],
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        version: pkg.dependencies['@babel/runtime'],
        corejs: false,
      }],
    ],
  };

  babelConfig.cacheIdentifier = `
    ${process.env.BABEL_ENV || ''}
    ${process.env.NODE_ENV || ''}
    ${process.env.BROWSERSLIST || ''}
    ${JSON.stringify(babelConfig)}
  `;

  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: es2015Deps,
          use: [
            { loader: 'babel-loader', options: babelConfig },
          ],
        },
      ],
    },

    resolve: {
      alias: {
        '@material-ui/core': fileURLToPath(new URL('../../node_modules/@material-ui/core/modern/', import.meta.url)),
        '@material-ui/system': fileURLToPath(new URL('../../node_modules/@material-ui/system/modern/', import.meta.url)),
        '@material-ui/utils': fileURLToPath(new URL('../../node_modules/@material-ui/utils/modern/', import.meta.url)),
      },
    },
  };
};
