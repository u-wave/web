import cx from 'clsx';

function Form({ children, className, ...props }: React.ComponentProps<'form'>) {
  return (
    <form className={cx('Form', className)} {...props}>
      {children}
    </form>
  );
}

export default Form;
