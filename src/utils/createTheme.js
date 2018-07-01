import { createMuiTheme } from '@material-ui/core/styles';
import { fade, decomposeColor, recomposeColor } from '@material-ui/core/styles/colorManipulator';

const AVERAGE_COLOR = 'rgb(127, 127, 127)';

// Taken from the color module:
// https://github.com/Qix-/color/blob/99266cebff6d898fc6a783a483812e322b03d5fa/index.js#L366
// Without the alpha stuff
function blend(a, b, weight) {
  const aColor = decomposeColor(a);
  const bColor = decomposeColor(b);

  const w = (2 * weight) - 1;
  const w1 = (w + 1) / 2.0;
  const w2 = 1 - w1;

  const values = [
    (w1 * aColor.values[0]) + (w2 * bColor.values[0]),
    (w1 * aColor.values[1]) + (w2 * bColor.values[1]),
    (w1 * aColor.values[2]) + (w2 * bColor.values[2]),
    aColor.values[3] || 1,
  ];

  return recomposeColor({ type: 'rgba', values });
}

export default function createTheme(base) {
  const muiTheme = createMuiTheme(base);

  const { palette, uwave } = muiTheme;

  return {
    ...muiTheme,
    cssProperties: {
      '--text-color': palette.text.primary,
      '--muted-text-color': palette.text.secondary,
      '--background-color': uwave.background,
      '--background-hover-color': uwave.backgroundHover,
      '--highlight-color': palette.primary.main,
      '--highbright-color': palette.primary.light,
      '--scrollbar-color': uwave.scrollbar,
      '--canvas-color': palette.background.paper,

      // Link colors
      '--link-color': uwave.link,
      '--link-visited-color': uwave.link,

      // Footer colours
      '--footer-border-color': '#303036',

      // Chat colours
      '--chat-background-color': uwave.sidePanel.background,
      '--chat-background-color2': uwave.sidePanel.alternate,
      '--chat-border-color': 'var(--footer-border-color)',

      // User related colours
      '--user-list-color': uwave.sidePanel.background,
      '--user-list-alternate-color': uwave.sidePanel.alternate,

      // Playlist colours
      '--media-list-color': 'transparent',
      // TODO Name this in some other way. It's used as the menu item focus colour
      // in various places.
      '--media-list-alternate-color': fade(uwave.mediaList.alternate, 0.3),

      // Settings panel colours
      '--settings-help-text-color': palette.text.hint,

      // Computed values, can't do these in CSS
      '--overlay-background': fade(uwave.background, 0.96),
      '--chat-suggestion-selected': fade('#fff', 0.1),
      '--soundcloud-meta-background': fade(uwave.background, 0.3),
      '--waitlist-locked-text-color': fade(palette.text.primary, 0.7),
      '--selected-media-row-color': fade(palette.primary.main, 0.7),
      '--chat-timestamp-text-color': blend(palette.text.primary, AVERAGE_COLOR, 0.7),
    },
  };
}
