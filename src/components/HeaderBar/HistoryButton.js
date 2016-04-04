import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import HistoryIcon from 'material-ui/lib/svg-icons/action/history';
import muiThemeable from 'material-ui/lib/muiThemeable';

const fullSize = { width: '100%', height: '100%' };

const HistoryButton = ({ onClick, muiTheme }) => (
  <IconButton
    className="HeaderHistoryButton"
    style={fullSize}
    tooltip="Play History"
    tooltipPosition="bottom-center"
    onClick={onClick}
  >
    <HistoryIcon
      style={fullSize}
      color={muiTheme.rawTheme.palette.textColor}
      className="HeaderHistoryButton-icon"
    />
  </IconButton>
);

export default muiThemeable(HistoryButton);
