import cx from 'clsx';

export interface SvgIconProps extends Omit<React.ComponentProps<'svg'>, 'ref'> {
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

export default SvgIcon;
