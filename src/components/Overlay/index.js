import cx from 'classnames';
import * as React from 'react';

const Overlay = ({ direction = 'bottom', children, className, ...props }) => (
  <div
    className={cx(
      'Overlay',
      `Overlay--from-${direction}`
    )}
  >
    <div className={cx('Overlay-body', className)} {...props}>
      {children}
    </div>
  </div>
);

Overlay.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
  direction: React.PropTypes.string
};

export default Overlay;
