/* eslint-disable global-require */
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const { MuiThemeProvider, createMuiTheme } = require('material-ui-next/styles');

module.exports = function renderMarkdown(source) {
  const Markdown = require('../../src/components/Markdown').default;
  const theme = require('../../src/theme').default;

  return renderToStaticMarkup(React.createElement(
    MuiThemeProvider,
    { theme: createMuiTheme(theme) },
    React.createElement(Markdown, { source }),
  ));
};
