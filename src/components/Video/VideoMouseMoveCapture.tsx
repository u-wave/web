const disableCursor = { cursor: 'none' };
const enableCursor = {};

type MouseMoveCaptureProps = {
  active: boolean,
  onMouseMove: () => void,
};
function MouseMoveCapture({ active, onMouseMove }: MouseMoveCaptureProps) {
  return (
    <div
      className="Video-overlay Video-capture"
      style={active ? enableCursor : disableCursor}
      onMouseMove={onMouseMove}
    />
  );
}

export default MouseMoveCapture;
