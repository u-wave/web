import * as React from 'react';
import pure from 'recompose/pure';
import IconButton from 'material-ui/IconButton';
import HistoryIcon from 'material-ui/svg-icons/action/history';
import muiThemeable from 'material-ui/styles/muiThemeable';

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
      color={muiTheme.palette.textColor}
      className="HeaderHistoryButton-icon"
    />
  </IconButton>
);

HistoryButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  muiTheme: React.PropTypes.object.isRequired
};

export default muiThemeable()(pure(HistoryButton));
