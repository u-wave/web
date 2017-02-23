const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;

const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

module.exports = function renderLoadingScreen() {
  /* eslint-disable import/no-unresolved */
  const LoadingScreen = require('../../src/components/LoadingScreen').default;
  const muiTheme = require('../../src/MuiTheme').default;
  /* eslint-enable import/no-unresolved */

  return renderToStaticMarkup(
    React.createElement(
      MuiThemeProvider,
      { muiTheme: getMuiTheme(muiTheme) },
      React.createElement(LoadingScreen)
    )
  );
};
