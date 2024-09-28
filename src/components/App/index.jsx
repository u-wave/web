import PropTypes from 'prop-types';
import FooterBar from '../FooterBar';
import HeaderBar from '../../containers/HeaderBar';
import Video from '../../containers/Video';
import ErrorArea from '../../containers/ErrorArea';
import Overlays from './Overlays';
import PlaylistManager from '../../containers/PlaylistManager';
import RoomHistory from '../../containers/RoomHistory';
import SettingsManager from '../../containers/SettingsManager';
import AdminProxy from '../AdminProxy';
import About from '../../containers/About';
import ConnectionIndicator from '../ConnectionIndicator';
import SidePanels from '../SidePanels';
import Dialogs from '../Dialogs';
import AddToPlaylistMenu from '../../containers/AddToPlaylistMenu';

function App({
  activeOverlay,
  isConnected,
  onCloseOverlay,
}) {
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
        <Overlays transitionName="Overlay" active={activeOverlay}>
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

App.propTypes = {
  activeOverlay: PropTypes.string,
  isConnected: PropTypes.bool.isRequired,
  onCloseOverlay: PropTypes.func.isRequired,
};

export default App;
