import React from 'react';
import { useSelector, useDispatch } from '../../hooks/useRedux';
import useClock from '../../hooks/useClock';
import { openFavoriteMenu } from '../../reducers/addToPlaylistMenu';
import { isMutedSelector, mobilePlaybackVolumeSelector } from '../../reducers/settings';
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

type VideoContainerProps = {
  enabled: boolean,
  size: string,
};
function VideoContainer(props: VideoContainerProps) {
  // Update `seek` every tick.
  useClock();

  const historyID = useSelector(historyIDSelector);
  const media = useSelector(mediaSelector);
  const seek = useSelector((s) => timeElapsedSelector(s));
  const volume = useSelector(mobilePlaybackVolumeSelector);
  const isMuted = useSelector(isMutedSelector);
  const voteStats = useSelector(currentVoteStatsSelector);
  const dispatch = useDispatch();
  const onUpvote = useCallback(() => {
    if (historyID != null) {
      dispatch(upvote({ historyID }));
    }
  }, [dispatch, historyID]);
  const onDownvote = useCallback(() => {
    if (historyID != null) {
      dispatch(downvote({ historyID }));
    }
  }, [dispatch, historyID]);
  const onFavorite = useCallback(() => {
    if (historyID != null) {
      // TODO: position is wrong
      dispatch(openFavoriteMenu(historyID, { x: 0, y: 0 }));
    }
  }, [historyID, dispatch]);

  return (
    <Video
      {...props}
      media={media}
      seek={seek}
      volume={volume}
      isMuted={isMuted}
      voteStats={voteStats}
      onUpvote={onUpvote}
      onDownvote={onDownvote}
      onFavorite={onFavorite}
    />
  );
}

export default VideoContainer;
