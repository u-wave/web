import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default function analyze(mode) {
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
}
