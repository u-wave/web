import React from 'react';
import PropTypes from 'prop-types';

const waitlistPositionStyle = {
  margin: 8
};

const WaitlistPosition = ({
  position
}) => (
  <span style={waitlistPositionStyle}>{position}</span>
);

WaitlistPosition.propTypes = {
  position: PropTypes.number.isRequired
};

export default WaitlistPosition;
