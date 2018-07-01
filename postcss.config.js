module.exports = (options) => {
  const { env } = options;

  return {
    plugins: {
      'postcss-import': {},
      'postcss-url': {
        url: 'rebase',
      },
      'postcss-cssnext': {
        features: {
          // Force enable custom properties so they can be used in color()
          // function calls even if the target browser does not support them.
          customProperties: {
            preserve: true,
          },
        },
      },
      cssnano: env === 'production' && {
        autoprefixer: false,
      },
    },
  };
};
