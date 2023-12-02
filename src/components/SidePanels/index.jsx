import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSelector } from '../../hooks/useRedux';
import Chat from '../Chat';
import RoomUserList from '../../containers/RoomUserList';
import WaitList from '../../containers/WaitList';
import PanelContainer from './PanelContainer';
import { listenerCountSelector } from '../../selectors/userSelectors';
import {
  sizeSelector as waitlistSizeSelector,
  positionSelector as waitlistPositionSelector,
} from '../../selectors/waitlistSelectors';

const { useState, useCallback } = React;

const subHeaderStyle = {
  fontSize: '125%',
};

const tabClasses = {
  root: 'SidePanel-tab',
  wrapper: 'SidePanel-tabLabel',
};

const getUsersLabel = (t, listenerCount) => (
  <>
    {t('users.title')}
    <span key="sub" style={subHeaderStyle}>
      {listenerCount}
    </span>
  </>
);

const getWaitlistLabel = (t, size, position) => {
  if (size > 0) {
    const posText = position !== -1
      ? `${position + 1} / ${size}`
      : size;

    return (
      <>
        {t('waitlist.title')}
        <span key="sub" style={subHeaderStyle}>{posText}</span>
      </>
    );
  }
  return t('waitlist.title');
};

function SidePanels() {
  const { t } = useTranslator();
  const [selected, setTab] = useState(0);
  const handleChange = useCallback((event, value) => setTab(value), [setTab]);
  const waitlistPosition = useSelector(waitlistPositionSelector);
  const waitlistSize = useSelector(waitlistSizeSelector);
  const listenerCount = useSelector(listenerCountSelector);

  return (
    <div className="SidePanels">
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
  );
}

export default SidePanels;
