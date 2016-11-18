import * as React from 'react';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { Tabs, Tab } from 'material-ui/Tabs';

import Chat from '../../containers/Chat';
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

const getWaitlistLabel = (t, size, position) => {
  if (size > 0) {
    const posText = position !== -1
      ? `${position + 1} / ${size}`
      : size;

    return [
      t('waitlist.title'),
      <span key="sub" style={subHeaderStyle}>{posText}</span>
    ];
  }
  return t('waitlist.title');
};

const SidePanels = ({
  t,
  selected,
  listenerCount,
  waitlistSize,
  waitlistPosition,
  onChange
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
      label={t('chat.title')}
      value="chat"
      style={selected === 'chat' ? activeTabStyle : tabStyle}
    >
      <Chat />
    </Tab>
    <Tab
      className="SidePanel-tab"
      disableTouchRipple
      label={[
        t('users.title'),
        <span key="sub" style={subHeaderStyle}>
          {listenerCount}
        </span>
      ]}
      value="room"
      style={selected === 'room' ? activeTabStyle : tabStyle}
    >
      <RoomUserList />
    </Tab>
    <Tab
      className="SidePanel-tab"
      disableTouchRipple
      label={getWaitlistLabel(t, waitlistSize, waitlistPosition)}
      value="waitlist"
      style={selected === 'waitlist' ? activeTabStyle : tabStyle}
    >
      <WaitList />
    </Tab>
  </Tabs>
);

SidePanels.propTypes = {
  t: React.PropTypes.func.isRequired,
  selected: React.PropTypes.string.isRequired,
  listenerCount: React.PropTypes.number.isRequired,
  waitlistSize: React.PropTypes.number.isRequired,
  waitlistPosition: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default compose(
  translate(),
  pure
)(SidePanels);
