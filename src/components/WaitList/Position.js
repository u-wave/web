import React from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import MuiAvatar from 'material-ui/Avatar';

const Position = ({
  muiTheme,
  position
}) => (
  <MuiAvatar
    className="WaitlistRow-position"
    backgroundColor="transparent"
    size={30}
    color={muiTheme.palette.textColor}
  >
    {position}
  </MuiAvatar>
);

Position.propTypes = {
  position: PropTypes.number.isRequired,
  muiTheme: PropTypes.object.isRequired
};

export default muiThemeable()(Position);
