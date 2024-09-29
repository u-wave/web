import { useEffect, useState } from 'react';
import Player from '../../../components/Player';
import VideoBackdrop from '../../../components/Video/VideoBackdrop';
import VoteButtons from './VoteButtons';
import type { Media } from '../../../reducers/booth';

type VideoProps = {
  media: Media | null,
  size: string,
  enabled: boolean,
  volume: number,
  isMuted: boolean,
  seek: number,
  voteStats: {
    isUpvote: boolean,
    isDownvote: boolean,
    isFavorite: boolean,
  },
  onUpvote: () => void,
  onDownvote: () => void,
  onFavorite: () => void,
};
function Video({
  media,
  voteStats,
  onUpvote,
  onDownvote,
  onFavorite,
  ...props
}: VideoProps) {
  const [enableOverlay, setEnableOverlay] = useState(false);
  const [showVoteButtons, setShowVoteButtons] = useState(false);

  useEffect(() => {
    // Switching to a different source type may require an autoplay tap again.
    // Disable the vote buttons until the media source reports playback started.
    setEnableOverlay(media?.sourceType === undefined);
  }, [media?.sourceType]);

  const handleClick = () => {
    setShowVoteButtons((value) => !value);
  };

  // Add the vote buttons tap-trap once autoplay permission is granted.
  const handlePlay = () => {
    setEnableOverlay(true);
  };

  return (
    <div className="Video">
      {media && <VideoBackdrop url={media.thumbnail} />}
      <div className="Video-player">
        <Player
          {...props}
          media={media}
          size="large"
          onPlay={handlePlay}
        />
      </div>
      {enableOverlay && (
        <button
          type="button"
          className="Video-buttonTrigger"
          onClick={handleClick}
          aria-label="Show vote buttons"
        />
      )}
      {showVoteButtons && (
        <div className="Video-buttons">
          <VoteButtons
            {...voteStats}
            onUpvote={onUpvote}
            onDownvote={onDownvote}
            onFavorite={onFavorite}
          />
        </div>
      )}
    </div>
  );
}

export default Video;
