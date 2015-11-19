import cx from 'classnames';
import React from 'react';

const Panel = ({ className, children }) => {
  return (
    <div className={cx('Panel', className)}>
      {children}
    </div>
  );
};

export default Panel;
