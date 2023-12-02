export type FillerProps = {
  width: number,
}

function Filler({ width }: FillerProps) {
  const style = { width };

  return <span className="Filler" style={style} />;
}

export default Filler;
