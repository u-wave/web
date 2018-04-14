import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import MuiButton from 'material-ui/Button';

const Button = ({
  children, className, text, ...props
}) => (
  <MuiButton
    variant="raised"
    color="primary"
    className={cx('Button', className)}
    type="submit"
    {...props}
  >
    {text || children}
  </MuiButton>
);

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
