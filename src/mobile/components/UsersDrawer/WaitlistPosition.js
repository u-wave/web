import React from 'react';
import PropTypes from 'prop-types';

const WaitlistPosition = ({ position }) => (
  <span className="UsersDrawer-position">
    {position}
  </span>
);

WaitlistPosition.propTypes = {
  position: PropTypes.number.isRequired,
};

export default WaitlistPosition;
