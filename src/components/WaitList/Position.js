import React from 'react';
import PropTypes from 'prop-types';
import MuiAvatar from '@material-ui/core/Avatar';

const Position = ({ position }) => (
  <MuiAvatar className="WaitlistRow-position">
    {position}
  </MuiAvatar>
);

Position.propTypes = {
  position: PropTypes.number.isRequired,
};

export default Position;
