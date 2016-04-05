import * as React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import SkipIcon from 'material-ui/lib/svg-icons/av/skip-next';

const fullSizeStyle = {
  height: '100%',
  width: '100%'
};

const SkipButton = ({ userIsDJ, currentDJ, onClick }) => {
  let message = 'Skip your turn';
  if (!userIsDJ) {
    message = `Skip ${currentDJ.username}'s turn`;
  }

  return (
    <IconButton
      tooltip={message}
      tooltipPosition="top-center"
      style={fullSizeStyle}
      onClick={onClick}
    >
      <SkipIcon />
    </IconButton>
  );
};

SkipButton.propTypes = {
  userIsDJ: React.PropTypes.bool.isRequired,
  currentDJ: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default SkipButton;
