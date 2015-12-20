import React from 'react';
import Button from './Button';

/* TODO think of a reasonable name */
const PanelSwitcher = ({ selected, selectPanel }) => {
  const highlightOffset = { chat: 0, room: '33%', waitlist: '67%' }[selected];
  return (
    <div className="PanelSwitcher">
      <Button
        active={selected === 'chat'}
        onClick={() => selectPanel('chat')}
      >
        Chat
      </Button>
      <Button
        active={selected === 'room'}
        onClick={() => selectPanel('room')}
      >
        Room
      </Button>
      <Button
        active={selected === 'waitlist'}
        onClick={() => selectPanel('waitlist')}
      >
        Waitlist
      </Button>

      <div
        className="PanelSwitcher-highlight"
        style={{ left: highlightOffset }}
      />
    </div>
  );
};

export default PanelSwitcher;
