import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useClock from '../../hooks/useClock';
import {
  openFavoriteMenu,
  vote,
} from '../../actions/VoteActionCreators';
import {
  historyIDSelector,
  mediaSelector,
  mobilePlaybackVolumeSelector,
  timeElapsedSelector,
} from '../../selectors/boothSelectors';
import { currentVoteStatsSelector } from '../../selectors/voteSelectors';
import Video from '../components/Video';

const {
  useCallback,
} = React;

function VideoContainer() {
  // Update `seek` every tick.
  useClock();

  const historyID = useSelector(historyIDSelector);
  const media = useSelector(mediaSelector);
  const seek = useSelector((s) => timeElapsedSelector(s));
  const volume = useSelector(mobilePlaybackVolumeSelector);
  const voteStats = useSelector(currentVoteStatsSelector);
  const dispatch = useDispatch();
  const onUpvote = useCallback(() => dispatch(vote({
    historyID,
    direction: 1,
  })), [historyID]);
  const onDownvote = useCallback(() => dispatch(vote({
    historyID,
    direction: -1,
  })), [historyID]);
  const onFavorite = useCallback((...args) => dispatch(openFavoriteMenu(...args)), [dispatch]);

  return (
    <Video
      historyID={historyID}
      media={media}
      seek={seek}
      volume={volume}
      voteStats={voteStats}
      onUpvote={onUpvote}
      onDownvote={onDownvote}
      onFavorite={onFavorite}
    />
  );
}

export default VideoContainer;
