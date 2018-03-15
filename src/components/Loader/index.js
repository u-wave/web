import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from './CircularProgress';

const Loader = ({ className, size }) => (
  <div className={cx('Loader', className)}>
    <CircularProgress size={size} />
  </div>
);

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string.isRequired,
};

export default Loader;
