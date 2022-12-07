import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import FavoritedIcon from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import DownvoteIcon from '@mui/icons-material/ThumbDown';
import UpvoteIcon from '@mui/icons-material/ThumbUp';

const VoteButtons = ({
  isUpvote, onUpvote,
  isDownvote, onDownvote,
  isFavorite, onFavorite,
}) => (
  <div className="VoteButtons">
    <IconButton onClick={onUpvote} className="VoteButtons-button">
      <UpvoteIcon className={cx(isUpvote && 'ResponseButton-icon--upvoted')} />
    </IconButton>
    <IconButton onClick={onFavorite} className="VoteButtons-button">
      {isFavorite ? (
        <FavoritedIcon className="ResponseButton-icon--favorite" />
      ) : (
        <FavoriteIcon />
      )}
    </IconButton>
    <IconButton onClick={onDownvote} className="VoteButtons-button">
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
