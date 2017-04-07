import React from 'react';
import PropTypes from 'prop-types';
import MoveToFirstIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import Action from './Action';

const MoveToFirst = ({ onFirst, ...props }) => (
  <Action {...props} onAction={onFirst}>
    <MoveToFirstIcon color="#fff" />
  </Action>
);

MoveToFirst.propTypes = {
  onFirst: PropTypes.func.isRequired
};

export default MoveToFirst;
