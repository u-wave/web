import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';

function makePalette({
  backgroundColor,
  canvasColor,
  primaryColor,
  highlightColor,
  nullColor,
  textColor
}) {
  return {
    nullColor,

    backgroundColor,
    backgroundHighlightColor: ColorManipulator.lighten(backgroundColor, 0.1, '1.0'),

    linkColor: primaryColor,
    linkColorVisited: ColorManipulator.darken(primaryColor, 0.5),

    chatColor: ColorManipulator.darken(backgroundColor, 0.1),
    chatColorAlternate: ColorManipulator.darken(backgroundColor, 0.15),

    primary1Color: primaryColor,
    primary2Color: highlightColor,
    primary3Color: Colors.lightWhite,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor,
    alternateTextColor: '#777777',
    canvasColor,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
  };
}

export default function (uw) {

  uw.applyTheme({
    logoUrl: 'assets/img/logo-white.png',
    rankColors: {
      admin: '#ff3b74',
      manager: '#05daa5',
      moderator: '#00b3dc',
      special: '#fc911d',
      default: ''
    },
    palette: makePalette({
      // backgroundColor: '#cecece',
      backgroundColor: '#151515',
      // canvasColor: '#dadada',
      canvasColor: '#303030',

      // primaryColor: '#209d53',
      primaryColor: '#9d2053',
      // highlightColor: '#00b262',
      highlightColor: '#b20062',

      nullColor: Colors.black,
      textColor: Colors.white
    })
  });
}
