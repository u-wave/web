import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LoginStore from '../../stores/LoginStore';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MuiTheme from '../../MuiTheme';
import Chat from '../Chat/Container';
import ChatInput from '../Chat/Input';
import RoomUserList from '../UserList/RoomUserList';
import WaitList from '../UserList/WaitList';
import FooterBar from '../FooterBar/Container';
import HeaderBar from '../HeaderBar';
import PanelSwitcher from '../PanelSwitcher';
import PanelGroup from '../PanelSwitcher/Group';
import Panel from '../PanelSwitcher/Panel';
import Video from '../Video';
import Overlays from './Overlays';
import PlaylistManager from '../PlaylistManager';
import LoginModal from '../LoginModal';
import listen from '../../utils/listen';

function getState() {
  return {
    user: LoginStore.getUser()
  };
}

@DragDropContext(HTML5Backend)
@listen(LoginStore)
export default class App extends React.Component {
  static propTypes = {
    activeOverlay: React.PropTypes.string,
    selectedPanel: React.PropTypes.string,
    settings: React.PropTypes.object,

    selectPanel: React.PropTypes.func
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  state = getState();

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MuiTheme)
    };
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    // state props
    const { activeOverlay, selectedPanel, settings } = this.props;
    // dispatch handlers
    const { selectPanel } = this.props;
    const { user } = this.state;
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
            <PlaylistManager key="playlistManager" />
          </Overlays>
          <FooterBar className="AppRow AppRow--bottom" />
        </div>

        <div className="AppColumn AppColumn--right">
          <div className="AppRow AppRow--top">
            <PanelSwitcher selected={selectedPanel} selectPanel={selectPanel} />
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
            {isLoggedIn && <ChatInput />}
          </div>
        </div>

        <LoginModal />
      </div>
    );
  }
}
