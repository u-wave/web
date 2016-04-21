import cx from 'classnames';
import * as React from 'react';

const Button = ({ children, className, text, ...props }) => (
  <button className={cx('Button', className)} {...props}>
    {text || children}
  </button>
);

Button.propTypes = {
  className: React.PropTypes.string,
  text: React.PropTypes.string,
  children: React.PropTypes.node
};

export default Button;
