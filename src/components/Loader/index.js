import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ className, size }) => (
  <div className={cx('Loader', className)}>
    <div className={cx('Spinner', `Spinner--${size}`)} />
  </div>
);

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string.isRequired
};

export default Loader;
