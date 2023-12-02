import cx from 'clsx';

type FormGroupProps = {
  className?: string,
  children: React.ReactNode,
};
function FormGroup({ children, className }: FormGroupProps) {
  return (
    <div className={cx('FormGroup', className)}>
      {children}
    </div>
  );
}

export default FormGroup;
