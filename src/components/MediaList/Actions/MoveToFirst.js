import React from 'react';
import PropTypes from 'prop-types';
import MoveToFirstIcon from 'material-ui-icons/KeyboardArrowUp';
import Action from './Action';

const MoveToFirst = ({ onFirst, ...props }) => (
  <Action {...props} onAction={onFirst}>
    <MoveToFirstIcon />
  </Action>
);

MoveToFirst.propTypes = {
  onFirst: PropTypes.func.isRequired,
};

export default MoveToFirst;
