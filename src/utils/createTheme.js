import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

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
    },
  };
}
