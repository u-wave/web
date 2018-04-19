import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

const Action = ({ children, onAction, ...attrs }) => (
  <IconButton
    className="MediaActions-action"
    onClick={onAction}
    {...attrs}
  >
    {children}
  </IconButton>
);

Action.propTypes = {
  children: PropTypes.element,
  onAction: PropTypes.func,
};

export default Action;
