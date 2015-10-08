import cx from 'classnames';
import React from 'react';

const Loader = ({ className, size }) => {
  return <div className={cx('Loader', `Loader-${size}`, className)} />;
};

export default Loader;
