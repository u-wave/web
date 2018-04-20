import onIdle from 'on-idle';
import PlaylistManager from '../containers/PlaylistManager';
import SettingsManager from '../containers/SettingsManager';
import RoomHistory from '../containers/RoomHistory';

function loaded() {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve);
    }
  });
}

export default function preloadDesktop() {
  loaded().then(() => {
    onIdle(() => {
      PlaylistManager.preload();
      SettingsManager.preload();
      RoomHistory.preload();
    });
  });
}
