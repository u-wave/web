import * as React from 'react';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

import Chat from '../../containers/Chat';
import RoomUserList from '../../containers/RoomUserList';
import WaitList from '../../containers/WaitList';

import Tabs from '../Tabs';
import Tab from '../Tabs/Tab';
import PanelTemplate from './PanelTemplate';

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
    >
      <RoomUserList />
    </Tab>
    <Tab
      className="SidePanel-tab"
      disableTouchRipple
      label={getWaitlistLabel(t, waitlistSize, waitlistPosition)}
      value="waitlist"
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
