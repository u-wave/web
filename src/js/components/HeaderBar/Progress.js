import cx from 'classnames';
import React from 'react';

const Progress = ({ className, total, startTime }) => {
  const elapsed = Math.round((Date.now() - startTime) / 1000);
  const percent = elapsed / total;
  const width = isNaN(percent) ? '0%' : `${percent * 100}%`;
  return (
    <div className={cx('Progress', className)}>
      <div className="Progress-fill" style={{ width: width }} />
    </div>
  );
};

export default Progress;
