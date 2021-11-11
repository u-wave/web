import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseBottomIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseTopIcon from '@mui/icons-material/KeyboardArrowUp';

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
