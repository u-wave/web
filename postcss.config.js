module.exports = (options) => {
  const { env } = options;

  return {
    plugins: {
      'postcss-import': {},
      'postcss-url': {
        url: 'rebase',
      },
      'postcss-preset-env': {
        stage: 2,
        features: {
          'nesting-rules': true,
          // Force enable custom properties so they can be used in color-mod()
          // function calls even if the target browser does not support them.
          'custom-properties': {
            preserve: true,
          },
          'color-mod-function': {
            unresolved: 'warn',
          },
        },
      },
      cssnano: env === 'production' && {},
    },
  };
};
