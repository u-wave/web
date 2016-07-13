import * as React from 'react';
import MoveToFirstIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Action from './Action';

const MoveToFirst = ({ onFirst, muiTheme, ...props }) => (
  <Action {...props} onAction={onFirst}>
    <MoveToFirstIcon color={muiTheme.palette.textColor} />
  </Action>
);

MoveToFirst.propTypes = {
  onFirst: React.PropTypes.func.isRequired,
  muiTheme: React.PropTypes.object.isRequired
};

export default muiThemeable()(MoveToFirst);
