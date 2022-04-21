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
  /\/strip-indent\//,
  /\/@mui\/icons-material\/esm\//,
  /\/@mui\/system\/modern\//,
  /\/@mui\/utils\/modern\//,
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
        '@mui/icons-material': fileURLToPath(new URL('../../node_modules/@mui/icons-material/esm/', import.meta.url)),
        '@mui/system': fileURLToPath(new URL('../../node_modules/@mui/system/modern/', import.meta.url)),
        '@mui/utils': fileURLToPath(new URL('../../node_modules/@mui/utils/modern/', import.meta.url)),
      },
    },
  };
};
