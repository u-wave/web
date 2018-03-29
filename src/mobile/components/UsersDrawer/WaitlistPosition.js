import React from 'react';
import PropTypes from 'prop-types';

const waitlistPositionStyle = {
  margin: 8,
};

const WaitlistPosition = ({
  position,
  style,
}) => (
  <span style={{ ...style, ...waitlistPositionStyle }}>
    {position}
  </span>
);

WaitlistPosition.propTypes = {
  position: PropTypes.number.isRequired,
  style: PropTypes.object,
};

export default WaitlistPosition;
