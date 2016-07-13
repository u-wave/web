import { black, darkBlack, white } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import * as Spacing from 'material-ui/styles/spacing';

import createPalette from './utils/createPalette';

export default {
  spacing: Spacing,
  fontFamily: 'Open Sans, sans-serif',
  rankColors: {
    admin: '#ff3b74',
    manager: '#05daa5',
    moderator: '#00b3dc',
    special: '#fc911d',
    default: ''
  },
  palette: createPalette({
    nullColor: black,
    backgroundColor: '#151515',
    backgroundHighlightColor: '#111111',
    linkColor: '#c72e6c',
    primaryColor: '#9d2053',
    highlightColor: '#b20062',
    textColor: white,
    canvasColor: '#303030',
    borderColor: fade(white, 0.3),
    disabledColor: fade(darkBlack, 0.3),

    notifications: {
      errorBackgroundColor: '#9d202f',
      errorTextColor: white
    }
  })
};
