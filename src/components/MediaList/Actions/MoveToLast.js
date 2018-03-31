import React from 'react';
import PropTypes from 'prop-types';
import MoveToLastIcon from 'material-ui-icons/KeyboardArrowDown';
import Action from './Action';

const MoveToLast = ({ onLast, ...props }) => (
  <Action {...props} onAction={onLast}>
    <MoveToLastIcon />
  </Action>
);

MoveToLast.propTypes = {
  onLast: PropTypes.func.isRequired,
};

export default MoveToLast;
