import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Slider from 'material-ui/Slider';
import MuiTheme from '../../MuiTheme';

const theme = getMuiTheme(MuiTheme);

export default props => (
  <MuiThemeProvider muiTheme={theme}>
    <Slider {...props} />
  </MuiThemeProvider>
);
