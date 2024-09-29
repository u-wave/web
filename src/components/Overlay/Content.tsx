import cx from 'clsx';

type OverlayContentProps = {
  className?: string,
  children: React.ReactNode,
};
function OverlayContent({ className, children }: OverlayContentProps) {
  return (
    <div className={cx('Overlay-content', className)}>
      {children}
    </div>
  );
}

export default OverlayContent;
