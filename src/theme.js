export default {
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
  // üWave specific colours
  uwave: {
    scrollbar: '#5f5f5f',
    background: '#151515',
    backgroundHover: '#111',
    link: '#c72e6c',
    sidePanel: {
      background: '#1b1b1b',
      alternate: '#222222',
    },
    mediaList: {
      background: 'transparent',
      alternate: '#303036',
    },
    mutedText: '#777',
  },
  overrides: {
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
};
