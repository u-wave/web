import cx from 'classnames';
import * as React from 'react';

const EmptyPanel = ({ className }) => (
  <div className={cx('PlaylistPanel', 'PlaylistPanel--empty', className)}>
    You don't have a playlist yet!
  </div>
);

EmptyPanel.propTypes = {
  className: React.PropTypes.string
};

export default EmptyPanel;
