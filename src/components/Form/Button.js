import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className, text, ...props }) => (
  <button className={cx('Button', className)} {...props}>
    {text || children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node
};

export default Button;
