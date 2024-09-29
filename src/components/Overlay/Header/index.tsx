import cx from 'clsx';
import CloseButton from './Close';

type HeaderProps = {
  className?: string,
  title: string,
  children?: React.ReactNode,
  direction?: 'bottom' | 'top',
  onCloseOverlay: () => void,
};
function Header({
  className,
  title,
  children,
  onCloseOverlay,
  direction = 'bottom',
}: HeaderProps) {
  return (
    <div className={cx('OverlayHeader', className)}>
      <div className="OverlayHeader-title">
        {title}
      </div>
      {children && (
        <div className="OverlayHeader-content">
          {children}
        </div>
      )}
      <div className="OverlayHeader-close">
        <CloseButton
          direction={direction}
          onClose={onCloseOverlay}
        />
      </div>
    </div>
  );
}

export default Header;
