import { createMuiTheme } from 'material-ui-next/styles'; // eslint-disable-line

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#b20062',
      main: '#9d2053',
      contrastText: '#fff',
    },
    background: {
      paper: '#303030',
    },
  },
  typography: {
    fontFamily: '"Open Sans", Roboto, Arial, sans-serif',
  },
});
