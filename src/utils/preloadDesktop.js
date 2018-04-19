import onIdle from 'on-idle';
import PlaylistManager from '../containers/PlaylistManager';
import SettingsManager from '../containers/SettingsManager';
import RoomHistory from '../containers/RoomHistory';

export default function preloadDesktop() {
  onIdle(() => {
    PlaylistManager.preload();
    SettingsManager.preload();
    RoomHistory.preload();
  });
}
