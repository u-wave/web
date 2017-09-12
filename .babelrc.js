const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
const browsers = process.env.BROWSERSLIST;

const targets = {};
if (browsers) {
  targets.browsers = browsers;
}
if (env === 'production') {
  targets.uglify = true;
}
if (env === 'testing') {
  targets.node = 'current';
}

const preset = {
  presets: [
    ['env', {
      modules: false,
      loose: env === 'production',
      targets,
      // Force enable the classes transform, react-hot-loader doesn't
      // appear to work well with native classes + arrow functions in
      // transpiled class properties.
      include: env === 'development' ? ['transform-es2015-classes'] : []
    }],
    'stage-2',
    'react'
  ],
  plugins: [
    'transform-export-extensions',
    ['transform-runtime', { polyfill: false }]
  ]
};

if (env === 'development') {
  preset.plugins.push('react-hot-loader/babel');
}

if (env === 'production') {
  preset.plugins.push(
    'transform-react-constant-elements',
    'transform-react-inline-elements',
    ['transform-react-remove-prop-types', { mode: 'wrap' }]
  );
}

if (env === 'testing') {
  preset.plugins.push('istanbul');
}

module.exports = preset;
