import React from 'react';
import PropTypes from 'prop-types';
import Favorite from './Favorite';
import Upvote from './Upvote';
import Downvote from './Downvote';
import Sadvote from './Sadvote';

const ResponseBar = ({
  disabled = false,
  isSadvote, sadvotesCount, onSadvote,
  isUpvote, upvotesCount, onUpvote,
  isDownvote, downvotesCount, onDownvote,
  isFavorite, favoritesCount, onFavorite,
}) => (
  <div className="AudienceResponse">
    <Sadvote
      disabled={disabled}
      onSadvote={onSadvote}
      count={sadvotesCount}
      active={isSadvote}
    />
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
  isSadvote: PropTypes.bool,
  isUpvote: PropTypes.bool,
  isFavorite: PropTypes.bool,
  isDownvote: PropTypes.bool,

  sadvotesCount: PropTypes.number.isRequired,
  upvotesCount: PropTypes.number.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  downvotesCount: PropTypes.number.isRequired,

  onSadvote: PropTypes.func.isRequired,
  onUpvote: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default React.memo(ResponseBar);
