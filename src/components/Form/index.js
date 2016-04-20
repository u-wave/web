import cx from 'classnames';
import * as React from 'react';

const Form = ({ children, className, ...props }) => (
  <form className={cx('Form', className)} {...props}>
    {children}
  </form>
);

Form.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node.isRequired
};

export default Form;
