import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = ({ children, className, ...props }) => (
  <div
    className={cx('FormGroup', className)}
    {...props}
  >
    {children}
  </div>
);

FormGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FormGroup;
