import * as React from 'react';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import IconButton from 'material-ui/IconButton';
import SkipIcon from 'material-ui/svg-icons/av/skip-next';

const fullSizeStyle = {
  height: '100%',
  width: '100%'
};

const SkipButton = ({ t, userIsDJ, currentDJ, onClick }) => {
  let message = t('booth.skip.self');
  if (!userIsDJ) {
    message = t('booth.skip.other', { user: currentDJ.username });
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
  t: React.PropTypes.func.isRequired,
  userIsDJ: React.PropTypes.bool.isRequired,
  currentDJ: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default compose(
  translate(),
  pure
)(SkipButton);
