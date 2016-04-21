import cx from 'classnames';
import * as React from 'react';

const Loader = ({ className, size }) => (
  <div className={cx('Loader', className)}>
    <div className={cx('Spinner', `Spinner--${size}`)} />
  </div>
);

Loader.propTypes = {
  className: React.PropTypes.string,
  size: React.PropTypes.string.isRequired
};

export default Loader;
