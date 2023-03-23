import cx from 'clsx';
import MuiButton, { ButtonProps } from '@mui/material/Button';

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
