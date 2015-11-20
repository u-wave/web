import cx from 'classnames';
import React from 'react';

const EmptyPanel = ({ className }) => {
  return (
    <div className={cx('PlaylistPanel', 'PlaylistPanel--empty', className)}>
      You don't have a playlist yet!
    </div>
  );
};

export default EmptyPanel;
