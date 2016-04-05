import * as React from 'react';
import pure from 'recompose/pure';

import Favorite from './Favorite';
import Upvote from './Upvote';
import Downvote from './Downvote';

const ResponseBar = ({
  isUpvote, upvotesCount, onUpvote,
  isDownvote, downvotesCount, onDownvote,
  isFavorite, favoritesCount, onFavorite
}) => {
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
};

ResponseBar.propTypes = {
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
