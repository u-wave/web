import cx from 'classnames';
import React from 'react';

const Button = ({ children, className, text, ...props }) => {
  return (
    <button className={cx('Button', className)} {...props}>
      {text || children}
    </button>
  );
};

export default Button;
