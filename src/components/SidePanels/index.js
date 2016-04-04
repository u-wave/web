import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import muiThemeable from 'material-ui/lib/muiThemeable';

import Chat from '../../containers/Chat';
import ChatInput from '../Chat/Input';
import RoomUserList from '../../containers/RoomUserList';
import WaitList from '../../containers/WaitList';

import PanelTemplate from './PanelTemplate';

const tabItemContainerStyle = ({ rawTheme }) => ({
  height: 56,
  backgroundColor: rawTheme.palette.backgroundColor
});

const tabStyle = ({ rawTheme }) => ({
  float: 'left',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: rawTheme.palette.textColor,
  fontSize: '10pt',
  height: '100%',
  backgroundColor: rawTheme.palette.backgroundColor
});

const activeTabStyle = theme => ({
  ...tabStyle(theme),
  backgroundColor: '#222'
});

const inkBarStyle = ({ rawTheme }) => ({
  height: 3,
  marginTop: -3,
  backgroundColor: rawTheme.palette.textColor
});

const contentStyle = () => ({
  // This ensures that the `position:absolute`s on divs _inside_ container
  // elements align correctly.
  position: 'static'
});

const getWaitlistLabel = (size, position) => {
  if (size > 0) {
    const posText = position !== -1
      ? `${position + 1} / ${size}`
      : size;

    return [
      'Waitlist',
      <span style={{ fontSize: '125%' }}>{posText}</span>
    ];
  }
  return 'Waitlist';
};

const SidePanels = ({
  muiTheme,
  selected, isLoggedIn,
  onlineUsersCount,
  waitlistSize, waitlistPosition,
  onChange, sendChatMessage
}) => {
  // Checking for strings in the onChange handler here because the ChatInput
  // change events bubble up. ChatInput events are React SyntheticEvents, and
  // the onChange event fired by <Tabs /> are strings (<Tab /> values).
  // TODO figure out how to avoid ChatInput bubbling!
  return (
    <Tabs
      value={selected}
      onChange={tab => typeof tab === 'string' && onChange(tab)}
      tabItemContainerStyle={tabItemContainerStyle(muiTheme)}
      inkBarStyle={inkBarStyle(muiTheme)}
      contentContainerStyle={contentStyle(muiTheme)}
      tabTemplate={PanelTemplate}
    >
      {/* Disabled touch ripples on tabs because they're offset weirdly. Also,
        * they interfere with the flexbox column layout for the Waitlist
        * position, because they add a wrapper <div />.*/}
      <Tab
        disableTouchRipple
        label="Chat"
        value="chat"
        style={selected === 'chat' ? activeTabStyle(muiTheme) : tabStyle(muiTheme)}
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
          <span style={{ fontSize: '125%' }}>{onlineUsersCount}</span>
        ]}
        value="room"
        style={selected === 'room' ? activeTabStyle(muiTheme) : tabStyle(muiTheme)}
      >
        <div className="AppRow AppRow--middle">
          <RoomUserList />
        </div>
      </Tab>
      <Tab
        disableTouchRipple
        label={getWaitlistLabel(waitlistSize, waitlistPosition)}
        value="waitlist"
        style={selected === 'waitlist' ? activeTabStyle(muiTheme) : tabStyle(muiTheme)}
      >
        <div className="AppRow AppRow--middle">
          <WaitList />
        </div>
      </Tab>
    </Tabs>
  );
};

export default muiThemeable(SidePanels);
