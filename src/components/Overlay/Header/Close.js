import cx from 'classnames';
import React from 'react';
import CloseIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';

const Close = ({ className, onClose }) => {
  return (
    <div
      className={cx('OverlayHeaderClose', className)}
      onClick={onClose}
    >
      <CloseIcon
        color="#fff"
        style={{ height: '100%', width: '100%' }}
        className="OverlayHeaderClose-icon"
      />
    </div>
  );
};

export default Close;
