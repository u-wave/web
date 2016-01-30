import cx from 'classnames';
import React from 'react';
import CloseBottomIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';
import CloseTopIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';

const icons = {
  bottom: CloseBottomIcon,
  top: CloseTopIcon
};

const Close = ({ className, onClose, direction }) => {
  const CloseIcon = icons[direction];
  return (
    <div
      role="button"
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
