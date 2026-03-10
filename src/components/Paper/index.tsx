import cx from 'clsx';

export interface PaperProps extends React.ComponentPropsWithRef<'div'> {
  elevation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
}
export default function Paper({
  className,
  elevation = 1,
  style,
  ...props
}: PaperProps) {
  // Using `Object.assign` for type flexibility reasons...
  // eslint-disable-next-line prefer-object-spread
  style = Object.assign({
    '--Paper-shadow': `var(--mui-shadows-${elevation})`,
    '--Paper-overlay': `var(--mui-overlays-${elevation})`,
  }, style);

  return (
    <div
      {...props}
      className={cx('Paper', className)}
      style={style}
    />
  );
}
