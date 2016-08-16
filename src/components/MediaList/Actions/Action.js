import * as React from 'react';

const Action = ({ children, onAction, ...attrs }) => (
  <div
    role="button"
    className="MediaActions-action"
    onClick={onAction}
    {...attrs}
  >
    {children}
  </div>
);

Action.propTypes = {
  children: React.PropTypes.element,
  onAction: React.PropTypes.func
};

export default Action;
