'use strict';

const h = require('react').createElement;
const { renderToStaticMarkup } = require('react-dom/server');
const { ServerStyleSheets, ThemeProvider, StylesProvider } = require('@material-ui/styles');
const { createMuiTheme } = require('@material-ui/core/styles');
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
  const createGenerateClassName = require('../../src/utils/createGenerateClassName').default;
  /* eslint-enable global-require */

  const generateClassName = createGenerateClassName();
  const sheets = new ServerStyleSheets();

  const renderElement = sheets.collect(
    h(CacheProvider, { value: cache },
      h(StylesProvider, { generateClassName },
        h(ThemeProvider, { theme: createMuiTheme(theme) }, element))),
  );
  const markup = renderToStaticMarkup(renderElement);

  const emotionStyles = extractCritical(markup);

  return {
    html: markup,
    css: `
      ${sheets.toString()}
      ${emotionStyles.css}
    `,
  };
};
