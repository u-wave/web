import cx from 'clsx';

export interface SvgIconProps extends Omit<React.ComponentProps<'svg'>, 'ref'> {
  path?: string;
  size?: 'medium' | 'small';
}

function SvgIcon({
  className,
  children,
  path,
  size = 'medium',
  ...props
}: SvgIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cx('SvgIcon', `SvgIcon--${size}`, className)} {...props}>
      {children ?? <path d={path} />}
    </svg>
  );
}

export default SvgIcon;
