const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;

const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
const LoadingScreen = require('../../lib/components/LoadingScreen').default;
const muiTheme = require('../../lib/MuiTheme').default;

module.exports = function renderLoadingScreen() {
  return renderToStaticMarkup(
    React.createElement(MuiThemeProvider, getMuiTheme(muiTheme),
      React.createElement(LoadingScreen)
    )
  );
};
