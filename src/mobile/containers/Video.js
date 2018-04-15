import compose from 'recompose/compose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import timed from '../../utils/timed';
import {
  openFavoriteMenu,
  doUpvote,
  doDownvote,
} from '../../actions/VoteActionCreators';
import {
  historyIDSelector,
  mediaSelector,
  playbackVolumeSelector,
  timeElapsedSelector,
} from '../../selectors/boothSelectors';
import { currentVoteStatsSelector } from '../../selectors/voteSelectors';
import Video from '../components/Video';

const mapStateToProps = createStructuredSelector({
  historyID: historyIDSelector,
  media: mediaSelector,
  seek: timeElapsedSelector,
  volume: playbackVolumeSelector,
  voteStats: currentVoteStatsSelector,
});

const mapDispatchToProps = {
  onFavorite: openFavoriteMenu,
  onUpvote: doUpvote,
  onDownvote: doDownvote,
};

const enhance = compose(
  timed(),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Video);
