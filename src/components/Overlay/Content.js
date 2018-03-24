import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const OverlayContent = ({
  className,
  children,
}) => (
  <div className={cx('Overlay-content', className)}>
    {children}
  </div>
);

OverlayContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default OverlayContent;
