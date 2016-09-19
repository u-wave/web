import cx from 'classnames';
import * as React from 'react';
import CloseButton from './Close';

const Header = ({
  className,
  title,
  children,
  onCloseOverlay,
  direction = 'bottom'
}) => (
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

Header.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
  direction: React.PropTypes.string,
  onCloseOverlay: React.PropTypes.func.isRequired
};

export default Header;
