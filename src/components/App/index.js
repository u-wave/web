/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
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

import SidePanels from '../../containers/SidePanels';
import Dialogs from '../Dialogs';
import AddToPlaylistMenu from '../../containers/AddToPlaylistMenu';
import DragLayer from '../../containers/DragLayer';

const App = ({
  activeOverlay,
  settings,
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
      </div>
      <Overlays transitionName="Overlay" active={activeOverlay}>
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
  activeOverlay: React.PropTypes.string,
  settings: React.PropTypes.object.isRequired,

  onCloseOverlay: React.PropTypes.func.isRequired
};

export default compose(
  DragDropContext(HTML5Backend),
  // DragDropContext needs to be able to set a ref on the component, so we can't
  // use a stateless function directly.
  toClass
)(App);
