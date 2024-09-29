type WaitlistPositionProps = {
  position: number,
};

function WaitlistPosition({ position }: WaitlistPositionProps) {
  return (
    <span className="UsersDrawer-position">
      {position}
    </span>
  );
}

export default WaitlistPosition;
