import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Overlay = ({ direction = 'bottom', children, className }) => (
  <div
    className={cx(
      'Overlay',
      `Overlay--from-${direction}`,
    )}
  >
    <div className={cx('Overlay-body', className)}>
      {children}
    </div>
  </div>
);

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  direction: PropTypes.string,
};

export default Overlay;
