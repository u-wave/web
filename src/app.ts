import './polyfills-modern';
import experimentalThemePlugin from './experimentalThemePlugin';
import load from './loadingUI';
import soundCloudSource from './sources/soundcloud';
import youTubeSource from './sources/youtube';
import readApplicationConfig from './utils/readApplicationConfig';
import Uwave from './Uwave';

const clientOptions = readApplicationConfig();
const uw = new Uwave(clientOptions);

// Add experimental theming API.
uw.use(experimentalThemePlugin);

// Configure the Media sources to be used by this üWave client instance.
// @ts-expect-error: TS2345 - TODO
uw.source(youTubeSource());
uw.source(soundCloudSource());

Object.defineProperty(window, 'uw', { value: uw });

load(uw).catch((err) => {
  setTimeout(() => {
    throw err;
  }, 0);
});
