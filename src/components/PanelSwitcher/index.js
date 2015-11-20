import React from 'react';
import Button from './Button';
import { selectPanel } from '../../actions/PanelSelectActionCreators';

/* TODO think of a reasonable name */
const PanelSwitcher = ({ selected }) => {
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
    </div>
  );
};

export default PanelSwitcher;
