import * as React from 'react';
import PropTypes from 'prop-types';

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
  onMouseMove: PropTypes.func.isRequired,
  active: PropTypes.bool
};

export default MouseMoveCapture;
