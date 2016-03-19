import cx from 'classnames';
import * as React from 'react';
import CloseBottomIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import CloseTopIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import muiThemeable from 'material-ui/styles/muiThemeable';

const icons = {
  bottom: CloseBottomIcon,
  top: CloseTopIcon
};

const fullSizeStyle = {
  height: '100%',
  width: '100%'
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
        color={muiTheme.palette.textColor}
        style={fullSizeStyle}
        className="OverlayHeaderClose-icon"
      />
    </div>
  );
};

Close.propTypes = {
  className: React.PropTypes.string,
  direction: React.PropTypes.string.isRequired,
  onClose: React.PropTypes.func.isRequired,
  muiTheme: React.PropTypes.object.isRequired
};

export default muiThemeable()(Close);
