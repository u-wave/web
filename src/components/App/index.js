import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import compose from 'recompose/compose';
import toClass from 'recompose/toClass';
import HTML5Backend from 'react-dnd-html5-backend';

import FooterBar from '../../containers/FooterBar';
import HeaderBar from '../../containers/HeaderBar';
import Video from '../../containers/Video';
import ErrorArea from '../../containers/ErrorArea';
import Overlays from './Overlays';
import PlaylistManager from '../../containers/PlaylistManager';
import RoomHistory from '../../containers/RoomHistory';
import SettingsManager from '../../containers/SettingsManager';
import About from '../../containers/About';
import ConnectionIndicator from '../ConnectionIndicator';

import SidePanels from '../../containers/SidePanels';
import Dialogs from '../Dialogs';
import AddToPlaylistMenu from '../../containers/AddToPlaylistMenu';
import DragLayer from '../../containers/DragLayer';

const App = ({
  activeOverlay,
  isConnected,
  settings,
  hasAboutPage,
  onCloseOverlay
}) => (
  <div className="App">
    <div className="AppColumn AppColumn--left">
      <div className="AppRow AppRow--top">
        <HeaderBar
          className="App-header"
          title="üWave"
        />
      </div>
      <div className="AppRow AppRow--middle">
        <Video
          enabled={settings.videoEnabled}
          size={settings.videoSize}
          isMuted={settings.muted}
          volume={settings.volume}
        />
        <ErrorArea />
        <ConnectionIndicator isConnected={isConnected} />
      </div>
      <Overlays transitionName="Overlay" active={activeOverlay}>
        {hasAboutPage && <About
          key="about"
          onCloseOverlay={onCloseOverlay}
        />}
        <PlaylistManager
          key="playlistManager"
          onCloseOverlay={onCloseOverlay}
        />
        <RoomHistory
          key="roomHistory"
          onCloseOverlay={onCloseOverlay}
        />
        <SettingsManager
          key="settings"
          onCloseOverlay={onCloseOverlay}
        />
      </Overlays>
      <FooterBar className="AppRow AppRow--bottom" />
    </div>

    <div className="AppColumn AppColumn--right">
      <SidePanels />
    </div>

    <Dialogs />

    <AddToPlaylistMenu />
    <DragLayer />
  </div>
);

App.propTypes = {
  activeOverlay: PropTypes.string,
  isConnected: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  hasAboutPage: PropTypes.bool,

  onCloseOverlay: PropTypes.func.isRequired
};

export default compose(
  DragDropContext(HTML5Backend),
  // DragDropContext needs to be able to set a ref on the component, so we can't
  // use a stateless function directly.
  toClass
)(App);
