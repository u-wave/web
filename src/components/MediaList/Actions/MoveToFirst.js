import React from 'react';
import MoveToFirstIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';

import Action from './Action';

const MoveToFirst = ({ onFirst, ...props }) => {
  return (
    <Action {...props} onAction={onFirst}>
      <MoveToFirstIcon color="#fff" />
    </Action>
  );
};

export default MoveToFirst;
