module.exports = function ExtractManifestPlugin(opts) {
  return {
    apply(compiler) {
      const evil = eval; // eslint-disable-line no-eval

      compiler.plugin('emit', (compilation, cb) => {
        const filename = compilation.namedChunks[opts.chunkName].files[0];
        const source = compilation.assets[filename].source();
        try {
          const manifest = evil(source).default;

          const json = opts.minimize
            ? JSON.stringify(manifest)
            : JSON.stringify(manifest, null, 2);

          // eslint-disable-next-line no-param-reassign
          delete compilation.assets[filename];
          // eslint-disable-next-line no-param-reassign
          compilation.assets['manifest.json'] = {
            source: () => json,
            size: () => json.length,
          };
        } catch (err) {
          compilation.warnings.push(err);
        }

        cb();
      });
    },
  };
};
