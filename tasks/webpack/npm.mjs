import * as fs from 'fs';
import CopyPlugin from 'copy-webpack-plugin';
import GeneratePackageJsonPlugin from 'generate-package-json-webpack-plugin';

const pkgRoot = new URL('../../', import.meta.url);
const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', pkgRoot), 'utf8'));

export default function getNpmConfig(env, outputPackage) {
  const npmBasePkg = {
    name: 'u-wave-web',
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    license: pkg.license,
    repository: {
      ...pkg.repository,
      directory: 'npm',
    },
    type: 'commonjs',
    main: './server/middleware.js',
    exports: {
      '.': {
        import: './middleware.mjs',
        default: './server/middleware.js',
      },
      './middleware': {
        import: './middleware.mjs',
        default: './server/middleware.js',
      },
    },
    bin: {
      'u-wave-web': './bin/u-wave-web',
    },
    engines: pkg.engines,
  };

  return {
    name: 'npm',
    context: new URL('./src', pkgRoot).pathname,
    mode: env.production ? 'production' : 'development',
    // Quit if there are errors.
    bail: env.production,
    devtool: 'source-map',

    entry: {
      middleware: './middleware/index.js',
      bin: './bin.js',
    },
    output: {
      path: outputPackage,
      filename: './server/[name].js',
      clean: false,
      library: {
        type: 'commonjs-module',
      },
    },
    target: 'node12',

    optimization: {
      minimize: false,
    },

    externals({ request }, callback) {
      if (request.startsWith('./') || request.startsWith('../')) {
        callback();
      } else {
        callback(null, `commonjs ${request}`);
      }
    },

    module: {
      rules: [
        { test: /\.js$/, use: 'babel-loader' },
      ],
    },

    plugins: [
      new GeneratePackageJsonPlugin(npmBasePkg, {
        sourcePackageFilenames:  [new URL('./package.json', pkgRoot).pathname],
        // Do not pin dependency versions
        useInstalledVersions: false,
      }),
      new CopyPlugin({
        patterns: [
          { from: new URL('./LICENSE', pkgRoot).pathname, to: './' },
        ],
      })
    ],
  };
}
