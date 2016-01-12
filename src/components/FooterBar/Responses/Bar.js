import React, { Component, PropTypes } from 'react';

import Favorite from './Favorite';
import Upvote from './Upvote';
import Downvote from './Downvote';

export default class ResponseBar extends Component {
  static propTypes = {
    isUpvote: PropTypes.bool,
    isFavorite: PropTypes.bool,
    isDownvote: PropTypes.bool,

    upvotesCount: PropTypes.number.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    downvotesCount: PropTypes.number.isRequired,

    onUpvote: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired,
    onDownvote: PropTypes.func.isRequired
  };

  render() {
    const {
      isFavorite, isUpvote, isDownvote,
      favoritesCount, upvotesCount, downvotesCount,
      onFavorite, onUpvote, onDownvote
    } = this.props;
    return (
      <div className="AudienceResponse">
        <Upvote
          onUpvote={onUpvote}
          count={upvotesCount}
          active={isUpvote}
        />
        <Favorite
          onFavorite={onFavorite}
          count={favoritesCount}
          active={isFavorite}
        />
        <Downvote
          onDownvote={onDownvote}
          count={downvotesCount}
          active={isDownvote}
        />
      </div>
    );
  }
}
