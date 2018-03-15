import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ children, className, ...props }) => (
  <form className={cx('Form', className)} {...props}>
    {children}
  </form>
);

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Form;
