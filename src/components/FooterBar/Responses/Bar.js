import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import Favorite from './Favorite';
import Upvote from './Upvote';
import Downvote from './Downvote';

const ResponseBar = ({
  disabled = false,
  isUpvote, upvotesCount, onUpvote,
  isDownvote, downvotesCount, onDownvote,
  isFavorite, favoritesCount, onFavorite,
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
  disabled: PropTypes.bool,
  isUpvote: PropTypes.bool,
  isFavorite: PropTypes.bool,
  isDownvote: PropTypes.bool,

  upvotesCount: PropTypes.number.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  downvotesCount: PropTypes.number.isRequired,

  onUpvote: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default pure(ResponseBar);
