module.exports = (api, envOverride) => {
  const env = envOverride || process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
  const browsers = process.env.BROWSERSLIST;

  api.cache(() => `${env}${browsers || ''}`);

  const targets = {};
  if (browsers) {
    targets.browsers = browsers;
  }
  if (env === 'middleware') {
    targets.node = '8.9';
  }
  if (env === 'testing') {
    targets.node = 'current';
  }

  const loose = env === 'middleware' || env === 'production';

  const preset = {
    presets: [
      ['@babel/preset-env', {
        modules: false,
        loose,
        targets,
        shippedProposals: true,
        forceAllTransforms: env === 'production',
      }],
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      ['@babel/plugin-proposal-class-properties', { loose }],
      ['@babel/plugin-transform-runtime', {
        polyfill: false,
        useBuiltIns: true,
      }]
    ]
  };

  if (env === 'development') {
    preset.plugins.push('module:react-hot-loader/babel');
  }

  if (env === 'production') {
    preset.plugins.push(
      '@babel/plugin-transform-react-constant-elements',
      '@babel/plugin-transform-react-inline-elements',
      ['transform-react-remove-prop-types', { mode: 'wrap' }]
    );
  }

  return preset;
};
