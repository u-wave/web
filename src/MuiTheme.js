import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';

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
    primary1Color: '#9d2053',
    primary2Color: '#b20062',
    primary3Color: Colors.lightWhite,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.white,
    alternateTextColor: '#777777',
    canvasColor: '#303030',
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),

    notifications: {
      errorBackgroundColor: '#9d202f',
      errorTextColor: Colors.white
    }
  }
};
