import cx from 'classnames';
import * as React from 'react';

const Overlay = ({ direction = 'bottom', children, ...props }) => (
  <div
    className={cx(
      'Overlay',
      `Overlay--from-${direction}`
    )}
  >
    <div {...props}>
      {children}
    </div>
  </div>
);

Overlay.propTypes = {
  children: React.PropTypes.node.isRequired,
  direction: React.PropTypes.string
};

export default Overlay;
