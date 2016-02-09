import cx from 'classnames';
import React from 'react';

const Overlay = ({ direction = 'bottom', children, ...props }) => {
  return (
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
};

export default Overlay;
