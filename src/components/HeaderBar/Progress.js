import cx from 'classnames';
import React from 'react';

const Progress = ({ className, percent }) => {
  const width = isFinite(percent) ? percent : 0;
  return (
    <div className={cx('Progress', className)}>
      <div
        className="Progress-fill"
        style={{
          transform: `scaleX(${width})`,
          webkitTransform: `scaleX(${width})`
        }}
      />
    </div>
  );
};

export default Progress;
