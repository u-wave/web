import cx from 'classnames';
import React from 'react';

const FormGroup = ({ children, className, ...props }) => {
  return (
    <div
      className={cx('FormGroup', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default FormGroup;
