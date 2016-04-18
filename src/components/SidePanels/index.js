import * as React from 'react';
import pure from 'recompose/pure';
import { Tabs, Tab } from 'material-ui/Tabs';

import Chat from '../../containers/Chat';
import ChatInput from '../Chat/Input';
import RoomUserList from '../../containers/RoomUserList';
import WaitList from '../../containers/WaitList';

import PanelTemplate from './PanelTemplate';

const tabItemContainerStyle = {
  height: 56,
  backgroundColor: '#151515'
};

const tabStyle = {
  float: 'left',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '10pt',
  height: '100%',
  backgroundColor: '#151515'
};

const activeTabStyle = {
  ...tabStyle,
  backgroundColor: '#222'
};

const inkBarStyle = {
  height: 3,
  marginTop: -3,
  backgroundColor: '#fff'
};

const contentStyle = {
  // This ensures that the `position:absolute`s on divs _inside_ container
  // elements align correctly.
  position: 'static'
};

const subHeaderStyle = {
  fontSize: '125%'
};

const getWaitlistLabel = (size, position) => {
  if (size > 0) {
    const posText = position !== -1
      ? `${position + 1} / ${size}`
      : size;

    return [
      'Waitlist',
      <span style={subHeaderStyle}>{posText}</span>
    ];
  }
  return 'Waitlist';
};

const SidePanels = ({
  selected, isLoggedIn,
  onlineUsersCount,
  waitlistSize, waitlistPosition,
  onChange, sendChatMessage
}) => (
  <Tabs
    value={selected}
    onChange={onChange}
    tabItemContainerStyle={tabItemContainerStyle}
    inkBarStyle={inkBarStyle}
    contentContainerStyle={contentStyle}
    tabTemplate={PanelTemplate}
  >
    {/* Disabled touch ripples on tabs because they're offset weirdly. Also,
      * they interfere with the flexbox column layout for the Waitlist
      * position, because they add a wrapper <div />.*/}
    <Tab
      disableTouchRipple
      label="Chat"
      value="chat"
      style={selected === 'chat' ? activeTabStyle : tabStyle}
    >
      <div className="AppRow AppRow--middle">
        <Chat />
      </div>
      <div className="AppRow AppRow--bottom ChatInputWrapper">
        {isLoggedIn && <ChatInput send={sendChatMessage} />}
      </div>
    </Tab>
    <Tab
      disableTouchRipple
      label={[
        'Room',
        <span style={subHeaderStyle}>{onlineUsersCount}</span>
      ]}
      value="room"
      style={selected === 'room' ? activeTabStyle : tabStyle}
    >
      <div className="AppRow AppRow--middle">
        <RoomUserList />
      </div>
    </Tab>
    <Tab
      disableTouchRipple
      label={getWaitlistLabel(waitlistSize, waitlistPosition)}
      value="waitlist"
      style={selected === 'waitlist' ? activeTabStyle : tabStyle}
    >
      <div className="AppRow AppRow--middle">
        <WaitList />
      </div>
    </Tab>
  </Tabs>
);

SidePanels.propTypes = {
  selected: React.PropTypes.bool.isRequired,
  isLoggedIn: React.PropTypes.bool.isRequired,
  onlineUsersCount: React.PropTypes.number.isRequired,
  waitlistSize: React.PropTypes.number.isRequired,
  waitlistPosition: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  sendChatMessage: React.PropTypes.func.isRequired
};

export default pure(SidePanels);
