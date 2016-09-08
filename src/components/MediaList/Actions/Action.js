import * as React from 'react';

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
  children: React.PropTypes.element,
  onAction: React.PropTypes.func
};

export default Action;
