module.exports = ({ env, webpack }) => ({
  plugins: {
    'postcss-import': { addDependencyTo: webpack },
    'postcss-cssnext': {},
    cssnano: env === 'production' && {
      autoprefixer: false
    }
  }
});
