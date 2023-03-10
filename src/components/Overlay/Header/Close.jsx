import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import SvgIcon from '../../SvgIcon';

const icons = {
  bottom: mdiChevronDown,
  top: mdiChevronUp,
};

function Close({ className, onClose, direction }) {
  return (
    <IconButton
      className={cx('OverlayHeaderClose', className)}
      onClick={onClose}
    >
      <SvgIcon path={icons[direction]} className="OverlayHeaderClose-icon" />
    </IconButton>
  );
}

Close.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Close;
