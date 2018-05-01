import React from 'react';
import PropTypes from 'prop-types';
import Player from '../../../components/Player';
import VideoBackdrop from '../../../components/Video/VideoBackdrop';
import VoteButtons from './VoteButtons';

class Video extends React.Component {
  static propTypes = {
    media: PropTypes.shape({
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

  state = {
    enableOverlay: false,
    showVoteButtons: false,
  };

  handleClick = () => {
    this.setState(s => ({
      showVoteButtons: !s.showVoteButtons,
    }));
  };

  // Add the vote buttons tap-trap once autoplay permission is granted.
  handlePlay = () => {
    this.setState({ enableOverlay: true });
  };

  render() {
    const {
      media,
      voteStats,
      onUpvote,
      onDownvote,
      onFavorite,
      ...props
    } = this.props;
    const { enableOverlay, showVoteButtons } = this.state;

    return (
      <div className="Video">
        {media && <VideoBackdrop url={media.thumbnail} />}
        <div className="Video-player">
          <Player
            {...props}
            media={media}
            size="large"
            onPlay={this.handlePlay}
          />
        </div>
        {enableOverlay && (
          <button
            className="Video-buttonTrigger"
            onClick={this.handleClick}
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
}

export default Video;
