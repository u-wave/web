import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';

function SvgIcon({
  className,
  children,
  path,
  ...props
}) {
  return (
    <svg viewBox="0 0 24 24" className={cx('SvgIcon', className)} {...props}>
      {children ?? <path d={path} />}
    </svg>
  );
}

SvgIcon.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(SvgIcon);
