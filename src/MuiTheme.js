import * as Colors from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';
import * as Spacing from 'material-ui/styles/spacing';

const backgroundColor = '#151515';

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
  palette: {
    nullColor: Colors.black,

    backgroundColor,
    backgroundHighlightColor: ColorManipulator.lighten(backgroundColor, 0.1, '1.0'),

    chatColor: ColorManipulator.darken(backgroundColor, 0.1),
    chatColorAlternate: ColorManipulator.darken(backgroundColor, 0.15),

    linkColor: '#c72e6c',

    primary1Color: '#9d2053',
    primary2Color: '#b20062',
    primary3Color: Colors.lightWhite,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.white,
    alternateTextColor: '#777777',
    canvasColor: '#303030',
    borderColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),

    notifications: {
      errorBackgroundColor: '#9d202f',
      errorTextColor: Colors.white
    }
  }
};
