import React from 'react';
import SettingsStore from '../../stores/SettingsStore';
import Chat from '../Chat';
import ChatInput from '../Chat/Input';
import UserPanel from '../UserPanel';
import FooterBar from '../FooterBar';
import HeaderBar from '../HeaderBar';
import PanelSwitcher from '../PanelSwitcher';
import PanelGroup from '../PanelSwitcher/Group';
import Panel from '../PanelSwitcher/Panel';
import Video from '../Video';
import Overlays from './Overlays';
import PlaylistManager from '../PlaylistManager';

function getState() {
  return {
    settings: SettingsStore.getAll()
  };
}

export default class App extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  state = getState();

  componentDidMount() {
    SettingsStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    SettingsStore.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    const { settings } = this.state;

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
            <Video size={settings.videoSize} />
          </div>
          <Overlays transitionName="Overlay">
            <PlaylistManager key="playlistManager" />
          </Overlays>
          <FooterBar className="AppRow AppRow--bottom" />
        </div>

        <div className="AppColumn AppColumn--right">
          <div className="AppRow AppRow--top">
            <PanelSwitcher />
          </div>
          <PanelGroup className="AppRow AppRow--middle">
            <Panel name="chat">
              <Chat />
            </Panel>
            <UserPanel name="room" />
            <Panel name="waitlist">
              [Placeholder]
            </Panel>
          </PanelGroup>
          <div className="AppRow AppRow--bottom">
            <ChatInput />
          </div>
        </div>
      </div>
    );
  }
}
