const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
const browsers = process.env.BROWSERSLIST;

const targets = {};
if (browsers) {
  targets.browsers = browsers;
}
if (env === 'production') {
  targets.uglify = true;
}

const preset = {
  presets: [
    ['env', {
      modules: false,
      targets
    }],
    'stage-2',
    'react'
  ],
  plugins: [
    'transform-decorators-legacy',
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

module.exports = preset;
