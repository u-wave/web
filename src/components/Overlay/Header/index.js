import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
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
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  direction: PropTypes.string,
  onCloseOverlay: PropTypes.func.isRequired
};

export default Header;
