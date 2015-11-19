import cx from 'classnames';
import React from 'react';

const Button = ({ className, text, active, onClick }) => {
  return (
    <div
      className={cx(
        'PanelButton',
        className,
        active && 'PanelButton--active'
      )}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
