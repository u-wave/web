import cx from 'classnames';
import React from 'react';
import FormGroup from './Group';

const Form = ({ children, className, ...props }) => {
  return (
    <form className={cx('Form', className)} {...props}>
      {children}
    </form>
  );
};

export default Form;
export { FormGroup };
