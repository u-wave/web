import React from 'react';
import Button from './Button';
import { selectPanel } from '../../actions/PanelSelectActionCreators';

/* TODO think of a reasonable name */
const PanelSwitcher = ({ selected }) => {
  const highlightOffset = { chat: 0, room: '33%', waitlist: '67%' }[selected];
  return (
    <div className="PanelSwitcher">
      <Button
        text="Chat"
        active={selected === 'chat'}
        onClick={() => selectPanel('chat')}
      />
      <Button
        text="Room"
        active={selected === 'room'}
        onClick={() => selectPanel('room')}
      />
      <Button
        text="Waitlist"
        active={selected === 'waitlist'}
        onClick={() => selectPanel('waitlist')}
      />

      <div
        className="PanelSwitcher-highlight"
        style={{ left: highlightOffset }}
      />
    </div>
  );
};

export default PanelSwitcher;
