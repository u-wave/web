/* eslint-disable global-require */
const h = require('react').createElement;
const { renderToStaticMarkup } = require('react-dom/server');
const { MuiThemeProvider, createMuiTheme, jssPreset } = require('@material-ui/core/styles');
const { JssProvider, SheetsRegistry } = require('react-jss');
const jss = require('jss');

module.exports = function prerender(element) {
  const theme = require('../../src/theme').default;
  const generateClassName = require('../../src/utils/generateClassName').default;

  const styles = jss.create(jssPreset());
  const registry = new SheetsRegistry();

  const markup = renderToStaticMarkup(h(
    JssProvider, { jss: styles, registry, generateClassName },
    h(
      MuiThemeProvider, { theme: createMuiTheme(theme), sheetsManager: new Map() },
      element,
    ),
  ));

  return {
    html: markup,
    css: registry.toString(),
  };
};
