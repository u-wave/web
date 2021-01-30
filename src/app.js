import Uwave from './Uwave';
import load from './loadingUI';
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

load(uw).catch((err) => {
  setTimeout(() => {
    throw err;
  }, 0);
});
