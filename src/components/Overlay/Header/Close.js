import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import CloseBottomIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import CloseTopIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

const icons = {
  bottom: CloseBottomIcon,
  top: CloseTopIcon,
};

const fullSizeStyle = {
  height: '100%',
  width: '100%',
};

const Close = ({ className, onClose, direction }) => {
  const CloseIcon = icons[direction];
  return (
    <button
      className={cx('OverlayHeaderClose', className)}
      onClick={onClose}
    >
      <CloseIcon
        color="#fff"
        style={fullSizeStyle}
        className="OverlayHeaderClose-icon"
      />
    </button>
  );
};

Close.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Close;
