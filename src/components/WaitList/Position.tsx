import MuiAvatar from '@mui/material/Avatar';

type PositionProps = {
  position: number,
}
function Position({ position }: PositionProps) {
  return (
    <MuiAvatar className="WaitlistRow-position">
      {position}
    </MuiAvatar>
  );
}

export default Position;
