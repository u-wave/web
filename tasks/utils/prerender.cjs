'use strict';

const h = require('react').createElement;
const { renderToStaticMarkup } = require('react-dom/server');
const { createTheme, ThemeProvider } = require('@mui/material/styles');
const { CacheProvider } = require('@emotion/react');
const createCache = require('@emotion/cache').default;
const createEmotionServer = require('@emotion/server/create-instance').default;

const cache = createCache({
  key: 'emc',
  prepend: true,
});

const { extractCritical } = createEmotionServer(cache);

module.exports = function prerender(element) {
  /* eslint-disable global-require */
  const theme = require('../../src/theme').default;
  /* eslint-enable global-require */

  const html = renderToStaticMarkup(
    h(CacheProvider, { value: cache },
      h(ThemeProvider, { theme: createTheme(theme) }, element))
  );

  const { css } = extractCritical(html);

  return {
    html,
    css,
  };
};
