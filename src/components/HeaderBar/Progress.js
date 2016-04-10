import cx from 'classnames';
import React from 'react';

import transformStyle from '../../utils/transformStyle';

const Progress = ({ className, percent }) => {
  const width = isFinite(percent) ? percent : 0;
  return (
    <div className={cx('Progress', className)}>
      <div
        className="Progress-fill"
        style={transformStyle(`scaleX(${width})`)}
      />
    </div>
  );
};

export default Progress;
