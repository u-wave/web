import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui-next/IconButton'; // eslint-disable-line
import FavoritedIcon from 'material-ui-icons/Favorite';
import FavoriteIcon from 'material-ui-icons/FavoriteBorder';
import DownvoteIcon from 'material-ui-icons/ThumbDown';
import UpvoteIcon from 'material-ui-icons/ThumbUp';

const VoteButtons = ({
  isUpvote, onUpvote,
  isDownvote, onDownvote,
  isFavorite, onFavorite,
}) => (
  <div className="VoteButtons">
    <IconButton onClick={onUpvote}>
      <UpvoteIcon className={cx(isUpvote && 'ResponseButton-icon--upvoted')} />
    </IconButton>
    <IconButton onClick={onFavorite}>
      {isFavorite ? (
        <FavoritedIcon className="ResponseButton-icon--favorite" />
      ) : (
        <FavoriteIcon />
      )}
    </IconButton>
    <IconButton onClick={onDownvote}>
      <DownvoteIcon className={cx(isDownvote && 'ResponseButton-icon--downvoted')} />
    </IconButton>
  </div>
);

VoteButtons.propTypes = {
  isUpvote: PropTypes.bool,
  isFavorite: PropTypes.bool,
  isDownvote: PropTypes.bool,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default VoteButtons;
