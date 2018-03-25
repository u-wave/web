import path from 'path';
import MuiTheme from './MuiTheme';

export default {
  name: 'üWave',
  short_name: 'üWave',
  start_url: '.',
  theme_color: MuiTheme.palette.primary1Color,
  background_color: '#151515',
  display: 'standalone',
  icons: [{
    type: 'image/png',
    src: path.join(__dirname, '../assets/icon-white.png'),
    sizes: [96, 144],
  }],
};
