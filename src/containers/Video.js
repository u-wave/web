import compose from 'recompose/compose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import timed from '../utils/timed';

import {
  historyIDSelector,
  mediaSelector,
  playbackVolumeSelector,
  timeElapsedSelector
} from '../selectors/boothSelectors';

import Video from '../components/Video';

const mapStateToProps = createStructuredSelector({
  historyID: historyIDSelector,
  media: mediaSelector,
  seek: timeElapsedSelector,
  volume: playbackVolumeSelector,
  isFullscreen: state => state.booth.isFullscreen
});

export default compose(
  timed(),
  connect(mapStateToProps)
)(Video);
