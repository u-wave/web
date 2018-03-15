import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { translate } from 'react-i18next';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
// State-related imports
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { videoSizeSelector } from '../../selectors/settingSelectors';
import { toggleVideoSize } from '../../actions/PlaybackActionCreators';

// Stolen from YouTube
const paths = {
  // Currently small, show "enlarge" icon:
  small: 'm 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z',
  // Currently large, show smaller icon: ("ensmall"?! 😂)
  large: 'm 26,13 0,10 -16,0 0,-10 z m -14,2 12,0 0,6 -12,0 0,-6 z',
};

const VideoSizeButton = ({
  t,
  videoSize,
  onToggleVideoSize,
}) => (
  <IconButton
    onClick={onToggleVideoSize}
    tooltip={videoSize === 'large'
      ? t('settings.disableLargeVideo')
      : t('settings.enableLargeVideo')
    }
    tooltipPosition="bottom-center"
  >
    <SvgIcon viewBox="6 6 24 24">
      <path d={paths[videoSize]} fillRule="evenodd" />
    </SvgIcon>
  </IconButton>
);

VideoSizeButton.propTypes = {
  t: PropTypes.func.isRequired,
  videoSize: PropTypes.oneOf(['small', 'large']).isRequired,
  onToggleVideoSize: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  videoSize: videoSizeSelector,
});
const mapDispatchToProps = dispatch => ({
  onToggleVideoSize: () => dispatch(toggleVideoSize()),
});

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(VideoSizeButton);
