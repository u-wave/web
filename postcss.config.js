module.exports = (options) => {
  const env = options.env;

  return {
    plugins: {
      'postcss-import': {},
      'postcss-url': {
        url: 'rebase'
      },
      'postcss-cssnext': {},
      cssnano: env === 'production' && {
        autoprefixer: false
      }
    }
  };
};
