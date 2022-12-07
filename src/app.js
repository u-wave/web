import Uwave from './Uwave';
import load from './loadingUI';
import experimentalThemePlugin from './experimentalThemePlugin';
import youTubeSource from './sources/youtube';
import soundCloudSource from './sources/soundcloud';
import readApplicationConfig from './utils/readApplicationConfig';

const clientOptions = readApplicationConfig();
if (import.meta.env.DEMO) {
  const url = new URL(window.location.href);
  clientOptions.apiUrl = url.searchParams.get('apiUrl') ?? 'https://u-wave-demo.fly.dev/api';
  clientOptions.socketUrl = url.searchParams.get('socketUrl') ?? 'wss://u-wave-demo.fly.dev';
}

const uw = new Uwave(clientOptions);

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
