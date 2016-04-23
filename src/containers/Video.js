import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

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
  volume: playbackVolumeSelector
});

export default connect(mapStateToProps)(Video);
