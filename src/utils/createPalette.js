import * as Colors from 'material-ui/styles/colors';
import {
  getLuminance,
  emphasize,
  fade,
  lighten,
  darken
} from 'material-ui/utils/colorManipulator';

function deemphasize(color, coefficient = 0.15) {
  return getLuminance(color) > 0.5 ?
    lighten(color, coefficient) :
    darken(color, coefficient);
}

/**
 * Create a material-ui palette with nice-ish derived defaults. The only
 * required parameters are `canvasColor` and `primaryColor`.
 *
 * The background color defaults to black, and the text color defaults to white.
 * Every other color is derived from the given colors, but can be overridden
 * simply by passing them in.
 */
export default function createPalette({
  backgroundColor = Colors.darkBlack,
  canvasColor,
  primaryColor,
  highlightColor = emphasize(primaryColor, 0.1),
  nullColor = Colors.black,
  textColor = Colors.white,
  ...rest
}) {
  const theme = {
    nullColor,

    backgroundColor,
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
    disabledColor: fade(Colors.darkBlack, 0.3),

    ...rest
  };

  return {
    backgroundHighlightColor: deemphasize(theme.backgroundColor, 0.1),

    linkColor: theme.primaryColor,
    linkColorVisited: darken(theme.primary1Color, 0.5),

    chatColor: darken(theme.backgroundColor, 0.1),
    chatColorAlternate: darken(theme.backgroundColor, 0.15),

    ...theme
  };
}
