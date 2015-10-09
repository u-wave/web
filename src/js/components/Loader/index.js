import cx from 'classnames';
import React from 'react';

const Loader = ({ className, size }) => {
  return (
    <div className={cx('Loader', className)}>
      <div className={cx('Spinner', `Spinner--${size}`)} />
    </div>
  );
};

export default Loader;
