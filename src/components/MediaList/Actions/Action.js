import React from 'react';
import PropTypes from 'prop-types';

const Action = ({ children, onAction, ...attrs }) => (
  <button
    className="MediaActions-action"
    onClick={onAction}
    {...attrs}
  >
    {children}
  </button>
);

Action.propTypes = {
  children: PropTypes.element,
  onAction: PropTypes.func
};

export default Action;
