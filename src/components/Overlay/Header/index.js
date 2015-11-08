import cx from 'classnames';
import React from 'react';
import CloseButton from './Close';

const Header = ({ className, title, children }) => {
  return (
    <div className={cx('OverlayHeader', className)}>
      <div className="OverlayHeader-title">
        {title.toUpperCase()}
      </div>
      <div className="OverlayHeader-content">
        {children}
      </div>
      <CloseButton className="OverlayHeader-close" />
    </div>
  );
};

export default Header;
