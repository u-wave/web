import './fixHooksInDev';
import Uwave from './Uwave';
import experimentalThemePlugin from './experimentalThemePlugin';
import youTubeSource from './sources/youtube';
import soundCloudSource from './sources/soundcloud';
import readApplicationConfig from './utils/readApplicationConfig';

const uw = new Uwave(readApplicationConfig());

// Add experimental theming API.
uw.use(experimentalThemePlugin);

// Configure the Media sources to be used by this üWave client instance.
uw.source(youTubeSource());
uw.source(soundCloudSource());

window.uw = uw;

uw.build().then(() => {
  return uw.renderToDOM(document.querySelector('#app'));
}).then(() => {
  document.querySelector('#app-loading').innerHTML = '';
  document.querySelector('#jss').textContent = '';
}).catch((err) => {
  document.querySelector('.LoadingScreen-notice').textContent = `Error: ${err.message}`;
  document.querySelector('.LoadingScreen-loader').hidden = true;
  document.querySelector('.LoadingScreen-warning').hidden = false;

  setTimeout(() => {
    throw err;
  }, 0);
});
