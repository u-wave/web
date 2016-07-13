import cx from 'classnames';
import * as React from 'react';

const FormGroup = ({ children, className, ...props }) => (
  <div
    className={cx('FormGroup', className)}
    {...props}
  >
    {children}
  </div>
);

FormGroup.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node.isRequired
};

export default FormGroup;
