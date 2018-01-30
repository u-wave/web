const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
const browsers = process.env.BROWSERSLIST;

const targets = {};
if (browsers) {
  targets.browsers = browsers;
}
if (env === 'testing') {
  targets.node = 'current';
}

const preset = {
  presets: [
    ['@babel/env', {
      modules: false,
      loose: env === 'production',
      forceAllTransforms: env === 'production',
      targets,
      // Force enable the classes transform, react-hot-loader doesn't
      // appear to work well with native classes + arrow functions in
      // transpiled class properties.
      include: env === 'development' ? ['transform-classes'] : []
    }],
    '@babel/stage-2',
    '@babel/react'
  ],
  plugins: [
    ['@babel/transform-runtime', { polyfill: false }]
  ]
};

if (env === 'development') {
  preset.plugins.push('react-hot-loader/babel');
}

if (env === 'production') {
  preset.plugins.push(
    '@babel/transform-react-constant-elements',
    '@babel/transform-react-inline-elements',
    ['transform-react-remove-prop-types', { mode: 'wrap' }]
  );
}

if (env === 'testing') {
  preset.plugins.push(
    '@babel/proposal-export-default-from',
    '@babel/proposal-export-namespace-from'
  );
} else {
  preset.plugins.push(
    '@babel/syntax-export-default-from',
    '@babel/syntax-export-namespace-from'
  );
}

module.exports = preset;
