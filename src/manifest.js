import MuiTheme from './MuiTheme';
import icon from '../assets/icon-white.png';

export default {
  name: 'üWave',
  short_name: 'üWave',
  start_url: '.',
  theme_color: MuiTheme.palette.primary1Color,
  background_color: '#151515',
  display: 'standalone',
  icons: [
    { type: 'image/png', src: icon, sizes: '144x144' }
  ]
};
