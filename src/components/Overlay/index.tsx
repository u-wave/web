import cx from 'clsx';

type OverlayProps = {
  className?: string,
  children: React.ReactNode,
  direction?: 'top' | 'bottom',
};
function Overlay({ direction = 'bottom', children, className }: OverlayProps) {
  return (
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
}

export default Overlay;
