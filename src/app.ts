import './polyfills-modern';
import Uwave from './Uwave';
import load from './loadingUI';
import experimentalThemePlugin from './experimentalThemePlugin';
import youTubeSource from './sources/youtube';
import soundCloudSource from './sources/soundcloud';
import readApplicationConfig from './utils/readApplicationConfig';

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
