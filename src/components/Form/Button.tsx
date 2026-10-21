import MuiButton, { type ButtonProps } from '@mui/material/Button';
import cx from 'clsx';

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      className={cx('Button', className)}
      type="submit"
      {...props}
    >
      {children}
    </MuiButton>
  );
}

export default Button;
