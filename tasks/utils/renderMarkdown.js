const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;

const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

module.exports = function renderMarkdown(source) {
  const Markdown = require('../../src/components/Markdown').default;
  const muiTheme = require('../../src/MuiTheme').default;

  return renderToStaticMarkup(
    React.createElement(
      MuiThemeProvider,
      { muiTheme: getMuiTheme(muiTheme) },
      React.createElement(Markdown, { source })
    )
  );
};
