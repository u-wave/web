import cx from 'classnames';
import React from 'react';

const Button = ({ className, children, active, onClick }) => {
  return (
    <div
      className={cx(
        'PanelButton',
        className,
        active && 'PanelButton--active'
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
