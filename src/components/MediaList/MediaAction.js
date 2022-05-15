import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';

const Action = ({ children, ...props }) => (
  <IconButton className="MediaActions-action" {...props}>
    {children}
  </IconButton>
);

Action.propTypes = {
  children: PropTypes.element,
};

export default Action;
