import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';

function Button({ children, className, ...props }) {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      className={cx('Button', className)}
      type="submit"
      {...props}
    >
      {children}
    </MuiButton>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
