import React from 'react';
import { useSelector, useDispatch } from '../../hooks/useRedux';
import useClock from '../../hooks/useClock';
import { openFavoriteMenu } from '../../reducers/addToPlaylistMenu';
import { mobilePlaybackVolumeSelector } from '../../reducers/settings';
import {
  upvote,
  downvote,
  historyIDSelector,
  mediaSelector,
  timeElapsedSelector,
  currentVoteStatsSelector,
} from '../../reducers/booth';
import Video from '../components/Video';

const {
  useCallback,
} = React;

function VideoContainer(props) {
  // Update `seek` every tick.
  useClock();

  const historyID = useSelector(historyIDSelector);
  const media = useSelector(mediaSelector);
  const seek = useSelector((s) => timeElapsedSelector(s));
  const volume = useSelector(mobilePlaybackVolumeSelector);
  const voteStats = useSelector(currentVoteStatsSelector);
  const dispatch = useDispatch();
  const onUpvote = useCallback(() => {
    dispatch(upvote({ historyID }));
  }, [dispatch, historyID]);
  const onDownvote = useCallback(() => {
    dispatch(downvote({ historyID }));
  }, [dispatch, historyID]);
  const onFavorite = useCallback((position) => {
    dispatch(openFavoriteMenu(historyID, position));
  }, [historyID, dispatch]);

  return (
    <Video
      {...props}
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
