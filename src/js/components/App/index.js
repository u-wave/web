import React from 'react';
import Chat from '../Chat';
import ChatInput from '../Chat/Input';
import UserPanel from '../UserPanel';
import FooterBar from '../FooterBar';
import HeaderBar from '../HeaderBar';
import PanelSwitcher from '../PanelSwitcher';
import PanelGroup from '../PanelSwitcher/Group';
import Panel from '../PanelSwitcher/Panel';
import Video from '../Video';

export default class App extends React.Component {
  render() {
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
            <Video />
          </div>
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
