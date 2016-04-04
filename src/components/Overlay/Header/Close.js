import cx from 'classnames';
import React from 'react';
import CloseBottomIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';
import CloseTopIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';
import muiThemeable from 'material-ui/lib/muiThemeable';

const icons = {
  bottom: CloseBottomIcon,
  top: CloseTopIcon
};

const Close = ({ className, onClose, direction, muiTheme }) => {
  const CloseIcon = icons[direction];
  return (
    <div
      role="button"
      className={cx('OverlayHeaderClose', className)}
      onClick={onClose}
    >
      <CloseIcon
        color={muiTheme.rawTheme.palette.textColor}
        style={{ height: '100%', width: '100%' }}
        className="OverlayHeaderClose-icon"
      />
    </div>
  );
};

export default muiThemeable(Close);
