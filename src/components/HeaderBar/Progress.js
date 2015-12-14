import cx from 'classnames';
import React from 'react';

const Progress = ({ className, duration, startTime, currentTime }) => {
  const elapsed = Math.round((currentTime - startTime) / 1000);
  const percent = elapsed / duration;
  const width = isNaN(percent) ? '0%' : `${percent * 100}%`;
  return (
    <div className={cx('Progress', className)}>
      <div className="Progress-fill" style={{ width: width }} />
    </div>
  );
};

export default Progress;
