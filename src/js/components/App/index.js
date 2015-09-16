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
        <div className="AppRow AppRow--top">
          <div className="AppColumn AppColumn--left">
            <HeaderBar
              className="App-header"
              title="üWave"
            />
          </div>
          <div className="AppColumn AppColumn--right">
            <PanelSwitcher />
          </div>
        </div>
        <div className="AppRow AppRow--middle">
          <div className="AppColumn AppColumn--left">
            <Video />
          </div>
          <PanelGroup className="AppColumn AppColumn--right">
            <Panel name="chat">
              <Chat />
            </Panel>
            <UserPanel name="room" />
            <Panel name="waitlist">
              [Placeholder]
            </Panel>
          </PanelGroup>
        </div>
        <div className="AppRow AppRow--bottom BottomBar">
          <div className="AppColumn AppColumn--left">
            <FooterBar />
          </div>
          <div className="AppColumn AppColumn--right">
            <ChatInput />
          </div>
        </div>
      </div>
    );
  }

}
