import cx from 'classnames';
import React from 'react';
import CloseButton from './Close';

const Header = ({ className, title, children, onCloseOverlay, direction = 'bottom' }) => {
  return (
    <div className={cx('OverlayHeader', className)}>
      <div className="OverlayHeader-title">
        {title.toUpperCase()}
      </div>
      <div className="OverlayHeader-content">
        {children}
      </div>
      <CloseButton
        direction={direction}
        className="OverlayHeader-close"
        onClose={onCloseOverlay}
      />
    </div>
  );
};

export default Header;
