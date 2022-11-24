import cx from 'clsx';

export type IconButtonProps = React.ComponentPropsWithRef<'button'>;

function IconButton({
  className,
  children,
  tabIndex = 0,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cx('IconButton', className)}
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
