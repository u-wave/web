import * as React from 'react';

const disableCursor = { cursor: 'none' };
const enableCursor = {};

const MouseMoveCapture = ({
  active,
  onMouseMove
}) => (
  <div
    className="Video-capture"
    style={active ? enableCursor : disableCursor}
    onMouseMove={onMouseMove}
  />
);

MouseMoveCapture.propTypes = {
  onMouseMove: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool
};

export default MouseMoveCapture;
