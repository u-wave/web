import IconButton, { type IconButtonProps } from '../IconButton';

function Action({ children, ...props }: IconButtonProps) {
  return (
    <IconButton className="MediaActions-action" {...props}>
      {children}
    </IconButton>
  );
}

export default Action;
