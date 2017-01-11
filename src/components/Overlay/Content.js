import cx from 'classnames';
import * as React from 'react';

const OverlayContent = ({
  className,
  children
}) => (
  <div className={cx('Overlay-content', className)}>
    {children}
  </div>
);

OverlayContent.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node.isRequired
};

export default OverlayContent;
