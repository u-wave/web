const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function analyze(mode) {
  const openOptions = {
    analyzerMode: 'server',
  };
  const staticOptions = {
    analyzerMode: 'static',
    openAnalyzer: false,
  };

  return {
    plugins: [
      new BundleAnalyzerPlugin(mode === 'open' ? openOptions : staticOptions),
    ],
  };
};
