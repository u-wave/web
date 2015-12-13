import React from 'react';

const Action = ({ children, onAction, ...attrs }) => {
  return (
    <div
      className="MediaActions-action"
      onClick={onAction}
      {...attrs}
    >
      {children}
    </div>
  );
};

export default Action;
