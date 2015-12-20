import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Chat from '../Chat/Container';
import ChatInput from '../Chat/Input';
import RoomUserList from '../UserList/RoomUserList';
import WaitList from '../UserList/WaitList';
import FooterBar from '../FooterBar/Container';
import HeaderBar from '../HeaderBar/Container';
import PanelSwitcher from '../PanelSwitcher';
import PanelGroup from '../PanelSwitcher/Group';
import Panel from '../PanelSwitcher/Panel';
import Video from '../Video/Container';
import Overlays from './Overlays';
import PlaylistManager from '../PlaylistManager/Container';
import LoginModal from '../LoginModal/Container';
import AddToPlaylistMenu from '../PlaylistManager/AddingMenu/Container';

@DragDropContext(HTML5Backend)
export default class App extends React.Component {
  static propTypes = {
    activeOverlay: React.PropTypes.string,
    selectedPanel: React.PropTypes.string,
    settings: React.PropTypes.object,
    user: React.PropTypes.object,
    waitlistPosition: React.PropTypes.number,
    waitlistSize: React.PropTypes.number,

    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func,
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
    const { onLogin, onRegister, onCloseOverlay, selectPanel, sendChatMessage } = this.props;
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
          </Overlays>
          <FooterBar className="AppRow AppRow--bottom" />
        </div>

        <div className="AppColumn AppColumn--right">
          <div className="AppRow AppRow--top">
            <PanelSwitcher
              selected={selectedPanel}
              waitlistPosition={waitlistPosition}
              waitlistSize={waitlistSize}
              selectPanel={selectPanel}
            />
          </div>
          <PanelGroup className="AppRow AppRow--middle" selected={selectedPanel}>
            <Panel name="chat">
              <Chat />
            </Panel>
            <Panel name="room">
              <RoomUserList />
            </Panel>
            <Panel name="waitlist">
              <WaitList />
            </Panel>
          </PanelGroup>
          <div className="AppRow AppRow--bottom ChatInputWrapper">
            {isLoggedIn && <ChatInput send={message => sendChatMessage(user, message)} />}
          </div>
        </div>

        <LoginModal
          onLogin={onLogin}
          onRegister={onRegister}
        />

        <AddToPlaylistMenu />
      </div>
    );
  }
}
