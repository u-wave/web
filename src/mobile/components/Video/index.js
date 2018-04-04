import React from 'react';
import PropTypes from 'prop-types';
import Player from '../../../components/Player';
import VoteButtons from './VoteButtons';

class Video extends React.Component {
  static propTypes = {
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
    showVoteButtons: false,
  };

  handleClick = () => {
    this.setState(s => ({
      showVoteButtons: !s.showVoteButtons,
    }));
  };

  render() {
    const {
      voteStats,
      onUpvote,
      onDownvote,
      onFavorite,
      ...props
    } = this.props;
    const { showVoteButtons } = this.state;

    return (
      <div className="Video">
        <div className="Video-player">
          <Player
            {...props}
            size="large"
          />
        </div>
        <button
          className="Video-buttonTrigger"
          onClick={this.handleClick}
          aria-label="Show vote buttons"
        />
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
