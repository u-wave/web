import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';

const Button = ({
  children, className, text, ...props
}) => (
  <MuiButton
    variant="contained"
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
