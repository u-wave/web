import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useIntl from '../../hooks/useIntl';
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
  wrapper: 'SidePanel-tabLabel',
};

function UsersLabel({ count }) {
  const { t } = useTranslator();
  const { numberFormatter } = useIntl();

  return (
    <>
      {t('users.title')}
      <span key="sub" style={subHeaderStyle}>
        {numberFormatter.format(count)}
      </span>
    </>
  );
}

UsersLabel.propTypes = {
  count: PropTypes.number.isRequired,
};

function WaitlistLabel({ size, position }) {
  const { t } = useTranslator();
  const { numberFormatter } = useIntl();

  if (size > 0) {
    const sizeText = numberFormatter.format(size);
    const posText = position !== -1
      ? `${numberFormatter.format(position + 1)} / ${sizeText}`
      : sizeText;

    return (
      <>
        {t('waitlist.title')}
        <span key="sub" style={subHeaderStyle}>{posText}</span>
      </>
    );
  }
  return t('waitlist.title');
}

WaitlistLabel.propTypes = {
  size: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
};

function SidePanels({ listenerCount, waitlistSize, waitlistPosition }) {
  const { t } = useTranslator();
  const [selected, setTab] = useState(0);
  const handleChange = useCallback((event, value) => setTab(value), [setTab]);

  return (
    <>
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
          label={<UsersLabel count={listenerCount} />}
        />
        <Tab
          classes={tabClasses}
          label={<WaitlistLabel size={waitlistSize} position={waitlistPosition} />}
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
    </>
  );
}

SidePanels.propTypes = {
  listenerCount: PropTypes.number.isRequired,
  waitlistSize: PropTypes.number.isRequired,
  waitlistPosition: PropTypes.number.isRequired,
};

export default SidePanels;
