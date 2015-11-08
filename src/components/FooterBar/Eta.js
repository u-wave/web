import cx from 'classnames';
import React from 'react';
import formatDuration from '../../utils/formatDuration';

const Eta = ({ className, eta }) => {
  return (
    <span className={cx('Eta', className)}>
      {eta > 0 ? `in ${formatDuration(eta)}` : ''}
    </span>
  );
};

export default Eta;
