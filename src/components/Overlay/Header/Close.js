import cx from 'classnames';
import React from 'react';
import CloseIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';
import { closeAll } from '../../../actions/OverlayActionCreators';

const Close = ({ className }) => {
  return (
    <div
      className={cx('OverlayHeaderClose', className)}
      onClick={closeAll}
    >
      <CloseIcon
        color="#fff"
        style={{ height: 32, width: 32, padding: 12 }}
        className="OverlayHeaderClose-icon"
      />
    </div>
  );
};

export default Close;
