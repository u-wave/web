import cx from 'classnames';
import React from 'react';

const Progress = ({ className, percent }) => {
  const width = isFinite(percent) ? `${percent * 100}%` : '0%';
  return (
    <div className={cx('Progress', className)}>
      <div className="Progress-fill" style={{ width: width }} />
    </div>
  );
};

export default Progress;
