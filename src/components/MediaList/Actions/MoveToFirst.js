import * as React from 'react';
import MoveToFirstIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import Action from './Action';

const MoveToFirst = ({ onFirst, ...props }) => (
  <Action {...props} onAction={onFirst}>
    <MoveToFirstIcon color="#fff" />
  </Action>
);

MoveToFirst.propTypes = {
  onFirst: React.PropTypes.func.isRequired
};

export default MoveToFirst;
