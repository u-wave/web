import React from 'react';
import PropTypes from 'prop-types';
import MoveToLastIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import Action from './Action';

const MoveToLast = ({ onLast, ...props }) => (
  <Action {...props} onAction={onLast}>
    <MoveToLastIcon color="#fff" />
  </Action>
);

MoveToLast.propTypes = {
  onLast: PropTypes.func.isRequired,
};

export default MoveToLast;
