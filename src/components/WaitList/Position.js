import * as React from 'react';

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
  position: React.PropTypes.number.isRequired,
  muiTheme: React.PropTypes.object.isRequired
};

export default muiThemeable()(Position);
