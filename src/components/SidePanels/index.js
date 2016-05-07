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
  color: '#fff',
  fontSize: '10pt',
  height: '100%',
  backgroundColor: '#151515'
};

const activeTabStyle = {
  ...tabStyle,
  backgroundColor: 'rgba(48, 48, 48, 0.3)'
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

const getUserListLabel = (users, guests) => [
  `Users: ${users}`,
  guests > 0 && (
    <span
      key="guests"
      className="SidePanel-tab-guests"
      title="Guests"
    >
      Guests: {guests}
    </span>
  )
];

const getWaitlistLabel = (size, position) => {
  if (size > 0) {
    const posText = position !== -1
      ? `${position + 1} / ${size}`
      : size;

    return [
      'Waitlist',
      <span key="sub" style={subHeaderStyle}>{posText}</span>
    ];
  }
  return 'Waitlist';
};

const SidePanels = ({
  selected,
  isLoggedIn,
  onlineUsersCount,
  onlineGuestsCount,
  waitlistSize,
  waitlistPosition,
  onChange,
  sendChatMessage
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
      * position, because they add a wrapper <div />.
      *
      * NB: SidePanel-tab includes some !important styles because material-ui
      * has an otherwise unstyleable element inside its tab bar that breaks our
      * user and waitlist position counter elements. material-ui uses it to
      * properly position tab labels. The overrides remove the height and
      * padding constraints from that in-between element. */}
    <Tab
      className="SidePanel-tab"
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
      className="SidePanel-tab"
      disableTouchRipple
      label={getUserListLabel(onlineUsersCount, onlineGuestsCount)}
      value="room"
      style={selected === 'room' ? activeTabStyle : tabStyle}
    >
      <div className="AppRow AppRow--middle">
        <RoomUserList />
      </div>
    </Tab>
    <Tab
      className="SidePanel-tab"
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
  selected: React.PropTypes.string.isRequired,
  isLoggedIn: React.PropTypes.bool.isRequired,
  onlineUsersCount: React.PropTypes.number.isRequired,
  onlineGuestsCount: React.PropTypes.number.isRequired,
  waitlistSize: React.PropTypes.number.isRequired,
  waitlistPosition: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  sendChatMessage: React.PropTypes.func.isRequired
};

export default pure(SidePanels);
