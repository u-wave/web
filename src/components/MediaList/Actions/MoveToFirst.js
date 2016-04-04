import React from 'react';
import MoveToFirstIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';
import muiThemeable from 'material-ui/lib/muiThemeable';

import Action from './Action';

const MoveToFirst = ({ onFirst, muiTheme, ...props }) => {
  return (
    <Action {...props} onAction={onFirst}>
      <MoveToFirstIcon color={muiTheme.rawTheme.palette.textColor} />
    </Action>
  );
};

export default muiThemeable(MoveToFirst);
