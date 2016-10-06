import * as React from 'react';
import pure from 'recompose/pure';

import Favorite from './Favorite';
import Upvote from './Upvote';
import Downvote from './Downvote';

const ResponseBar = ({
  disabled = false,
  isUpvote, upvotesCount, onUpvote,
  isDownvote, downvotesCount, onDownvote,
  isFavorite, favoritesCount, onFavorite
}) => (
  <div className="AudienceResponse">
    <Upvote
      disabled={disabled}
      onUpvote={onUpvote}
      count={upvotesCount}
      active={isUpvote}
    />
    <Favorite
      disabled={disabled}
      onFavorite={onFavorite}
      count={favoritesCount}
      active={isFavorite}
    />
    <Downvote
      disabled={disabled}
      onDownvote={onDownvote}
      count={downvotesCount}
      active={isDownvote}
    />
  </div>
);

ResponseBar.propTypes = {
  disabled: React.PropTypes.bool,
  isUpvote: React.PropTypes.bool,
  isFavorite: React.PropTypes.bool,
  isDownvote: React.PropTypes.bool,

  upvotesCount: React.PropTypes.number.isRequired,
  favoritesCount: React.PropTypes.number.isRequired,
  downvotesCount: React.PropTypes.number.isRequired,

  onUpvote: React.PropTypes.func.isRequired,
  onFavorite: React.PropTypes.func.isRequired,
  onDownvote: React.PropTypes.func.isRequired
};

export default pure(ResponseBar);
