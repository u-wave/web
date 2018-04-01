/* eslint-disable global-require */
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const { MuiThemeProvider, createMuiTheme } = require('material-ui-next/styles'); // eslint-disable-line

module.exports = function renderLoadingScreen() {
  const LoadingScreen = require('../../src/components/LoadingScreen').default;
  const theme = require('../../src/theme').default;

  return renderToStaticMarkup(React.createElement(
    MuiThemeProvider,
    { theme: createMuiTheme(theme) },
    React.createElement(LoadingScreen),
  ));
};
