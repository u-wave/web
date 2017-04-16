module.exports = class ExtractManifestPlugin {
  constructor(opts) {
    this.opts = opts;
  }

  apply(compiler) {
    const evil = eval; // eslint-disable-line no-eval

    compiler.plugin('emit', (compilation, cb) => {
      const filename = compilation.namedChunks[this.opts.chunkName].files[0];
      const manifest = evil(compilation.assets[filename].source()).default;

      const json = this.opts.minimize
        ? JSON.stringify(manifest)
        : JSON.stringify(manifest, null, 2);

      // eslint-disable-next-line no-param-reassign
      delete compilation.assets[filename];
      // eslint-disable-next-line no-param-reassign
      compilation.assets['manifest.json'] = {
        source: () => json,
        size: () => json.length
      };

      cb();
    });
  }
};
