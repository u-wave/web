import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseBottomIcon from '@material-ui/icons/KeyboardArrowDown';
import CloseTopIcon from '@material-ui/icons/KeyboardArrowUp';

const icons = {
  bottom: CloseBottomIcon,
  top: CloseTopIcon,
};

const Close = ({ className, onClose, direction }) => {
  const CloseIcon = icons[direction];
  return (
    <IconButton
      className={cx('OverlayHeaderClose', className)}
      onClick={onClose}
    >
      <CloseIcon className="OverlayHeaderClose-icon" />
    </IconButton>
  );
};

Close.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Close;
