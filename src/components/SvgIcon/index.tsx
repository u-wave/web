import cx from 'clsx';
import React from 'react';

export interface SvgIconProps extends React.ComponentProps<'svg'> {
  path?: string;
}

function SvgIcon({
  className,
  children,
  path,
  ...props
}: SvgIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cx('SvgIcon', className)} {...props}>
      {children ?? <path d={path} />}
    </svg>
  );
}

export default React.memo(SvgIcon);
