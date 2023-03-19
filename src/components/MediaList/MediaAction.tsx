import IconButton, { IconButtonProps } from '@mui/material/IconButton';

function Action({ children, ...props }: IconButtonProps) {
  return (
    <IconButton className="MediaActions-action" {...props}>
      {children}
    </IconButton>
  );
}

export default Action;
