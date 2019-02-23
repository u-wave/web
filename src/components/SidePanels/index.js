import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Chat from '../Chat';
import RoomUserList from '../../containers/RoomUserList';
import WaitList from '../../containers/WaitList';
import PanelContainer from './PanelContainer';

const { useState, useCallback } = React;

const subHeaderStyle = {
  fontSize: '125%',
};

const tabClasses = {
  root: 'SidePanel-tab',
  label: 'SidePanel-tabLabel',
};

const getUsersLabel = (t, listenerCount) => (
  <React.Fragment>
    {t('users.title')}
    <span key="sub" style={subHeaderStyle}>
      {listenerCount}
    </span>
  </React.Fragment>
);

const getWaitlistLabel = (t, size, position) => {
  if (size > 0) {
    const posText = position !== -1
      ? `${position + 1} / ${size}`
      : size;

    return (
      <React.Fragment>
        {t('waitlist.title')}
        <span key="sub" style={subHeaderStyle}>{posText}</span>
      </React.Fragment>
    );
  }
  return t('waitlist.title');
};

function SidePanels({ listenerCount, waitlistSize, waitlistPosition }) {
  const { t } = useTranslator();
  const [selected, setTab] = useState(0);
  const handleChange = useCallback((event, value) => setTab(value), [setTab]);

  return (
    <div>
      <Tabs
        value={selected}
        onChange={handleChange}
        variant="fullWidth"
        classes={{
          root: 'SidePanel-tabs',
          indicator: 'SidePanel-indicator',
        }}
      >
        <Tab
          classes={tabClasses}
          label={t('chat.title')}
        />
        <Tab
          classes={tabClasses}
          label={getUsersLabel(t, listenerCount)}
        />
        <Tab
          classes={tabClasses}
          label={getWaitlistLabel(t, waitlistSize, waitlistPosition)}
        />
      </Tabs>
      <div>
        <PanelContainer selected={selected === 0}>
          <Chat />
        </PanelContainer>
        <PanelContainer selected={selected === 1}>
          <RoomUserList />
        </PanelContainer>
        <PanelContainer selected={selected === 2}>
          <WaitList />
        </PanelContainer>
      </div>
    </div>
  );
}

SidePanels.propTypes = {
  listenerCount: PropTypes.number.isRequired,
  waitlistSize: PropTypes.number.isRequired,
  waitlistPosition: PropTypes.number.isRequired,
};

export default SidePanels;
