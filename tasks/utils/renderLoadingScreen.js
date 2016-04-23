import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LoadingScreen from '../../src/components/LoadingScreen';
import muiTheme from '../../src/MuiTheme';

export default function renderLoadingScreen() {
  return renderToStaticMarkup(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <LoadingScreen />
    </MuiThemeProvider>
  );
}
