import React from 'react';
import PropTypes from 'prop-types';
import Player from '../../../components/Player';
import VideoBackdrop from '../../../components/Video/VideoBackdrop';
import VoteButtons from './VoteButtons';

const {
  useEffect,
  useState,
} = React;

function Video({
  media,
  voteStats,
  onUpvote,
  onDownvote,
  onFavorite,
  ...props
}) {
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

Video.propTypes = {
  media: PropTypes.shape({
    sourceType: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }),
  voteStats: PropTypes.shape({
    isUpvote: PropTypes.bool,
    isFavorite: PropTypes.bool,
    isDownvote: PropTypes.bool,
  }),

  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default Video;
