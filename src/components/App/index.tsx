import About from '../../containers/About';
import AddToPlaylistMenu from '../../containers/AddToPlaylistMenu';
import ErrorArea from '../../containers/ErrorArea';
import HeaderBar from '../../containers/HeaderBar';
import PlaylistManager from '../../containers/PlaylistManager';
import RoomHistory from '../../containers/RoomHistory';
import SettingsManager from '../../containers/SettingsManager';
import Video from '../../containers/Video';
import AdminProxy from '../AdminProxy';
import ConnectionIndicator from '../ConnectionIndicator';
import Dialogs from '../Dialogs';
import FooterBar from '../FooterBar';
import SidePanels from '../SidePanels';
import Overlays from './Overlays';

type AppProps = {
  isConnected: boolean,
  activeOverlay: string | null,
  onCloseOverlay: () => void,
};
function App({
  isConnected,
  activeOverlay,
  onCloseOverlay,
}: AppProps) {
  return (
    <div className="App">
      <div className="AppColumn AppColumn--left">
        <div className="AppRow AppRow--top">
          <HeaderBar
            className="App-header"
            title="üWave"
          />
        </div>
        <div className="AppRow AppRow--middle App-media">
          <Video />
          <ErrorArea />
          <ConnectionIndicator isConnected={isConnected} />
        </div>
        <Overlays active={activeOverlay}>
          <About key="about" onCloseOverlay={onCloseOverlay} />
          <AdminProxy key="admin" onCloseOverlay={onCloseOverlay} />
          <PlaylistManager key="playlistManager" onCloseOverlay={onCloseOverlay} />
          <RoomHistory key="roomHistory" onCloseOverlay={onCloseOverlay} />
          <SettingsManager key="settings" onCloseOverlay={onCloseOverlay} />
        </Overlays>
        <FooterBar className="AppRow AppRow--bottom" />
      </div>

      <div className="AppColumn AppColumn--right">
        <SidePanels />
      </div>

      <Dialogs />

      <AddToPlaylistMenu />
    </div>
  );
}

export default App;
