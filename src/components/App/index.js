import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import FooterBar from '../../containers/FooterBar';
import HeaderBar from '../../containers/HeaderBar';
import Video from '../../containers/Video';
import Overlays from './Overlays';
import PlaylistManager from '../../containers/PlaylistManager';
import RoomHistory from '../../containers/RoomHistory';
import SettingsManager from '../../containers/SettingsManager';

import SidePanels from '../SidePanels';
import Dialogs from '../Dialogs';
import AddToPlaylistMenu from '../../containers/AddToPlaylistMenu';
import DragLayer from '../../containers/DragLayer';

@DragDropContext(HTML5Backend)
export default class App extends React.Component {
  static propTypes = {
    activeOverlay: React.PropTypes.string,
    selectedPanel: React.PropTypes.string,
    settings: React.PropTypes.object,
    user: React.PropTypes.object,
    waitlistPosition: React.PropTypes.number,
    waitlistSize: React.PropTypes.number,

    onCloseOverlay: React.PropTypes.func,
    selectPanel: React.PropTypes.func,
    sendChatMessage: React.PropTypes.func
  };

  render() {
    // state props
    const {
      activeOverlay, selectedPanel, settings, user,
      waitlistPosition, waitlistSize
    } = this.props;
    // dispatch handlers
    const {
      onCloseOverlay,
      selectPanel, sendChatMessage
    } = this.props;
    const isLoggedIn = !!user;

    return (
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
          <SidePanels
            selected={selectedPanel}
            isLoggedIn={isLoggedIn}
            waitlistSize={waitlistSize}
            waitlistPosition={waitlistPosition}
            onChange={selectPanel}
            sendChatMessage={sendChatMessage}
          />
        </div>

        <Dialogs />

        <AddToPlaylistMenu />
        <DragLayer />
      </div>
    );
  }
}
