export default {
  palette: {
    mode: 'dark',
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
  components: {
    MuiIconButton: {
      defaultProps: {
        // The default changed in material-ui v5, but our design relies on the old "large" size.
        size: 'large',
      },
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiDialog: {
      // Disable elevation brightening in dialogs
      defaultProps: {
        PaperProps: {
          elevation: 0,
        },
      },
    },
  },
};
