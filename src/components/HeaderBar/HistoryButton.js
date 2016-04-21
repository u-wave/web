import * as React from 'react';
import pure from 'recompose/pure';
import IconButton from 'material-ui/IconButton';
import HistoryIcon from 'material-ui/svg-icons/action/history';

const fullSize = { width: '100%', height: '100%' };

const HistoryButton = ({ onClick }) => (
  <IconButton
    className="HeaderHistoryButton"
    style={fullSize}
    tooltip="Play History"
    tooltipPosition="bottom-center"
    onClick={onClick}
  >
    <HistoryIcon
      style={fullSize}
      color="#fff"
      className="HeaderHistoryButton-icon"
    />
  </IconButton>
);

HistoryButton.propTypes = {
  onClick: React.PropTypes.func.isRequired
};

export default pure(HistoryButton);
