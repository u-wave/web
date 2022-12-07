import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import DownvoteIcon from '@mui/icons-material/ThumbDown';
import UpvoteIcon from '@mui/icons-material/ThumbUp';
import FavoritedIcon from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';

const Votes = ({
  upvotes, downvotes, favorites, isUpvote, isDownvote, isFavorite,
}) => {
  const CurrentFavoriteIcon = isFavorite ? FavoritedIcon : FavoriteIcon;
  return (
    <div className="MobileHistoryVotes">
      <div className="MobileHistoryVotes-vote">
        <UpvoteIcon className={cx('MobileHistoryVotes-icon', isUpvote && 'ResponseButton-icon--upvoted')} />
        <span>{upvotes.length}</span>
      </div>
      <div className="MobileHistoryVotes-vote">
        <CurrentFavoriteIcon className="MobileHistoryVotes-icon ResponseButton-icon--favorite" />
        <span>{favorites.length}</span>
      </div>
      <div className="MobileHistoryVotes-vote">
        <DownvoteIcon className={cx('MobileHistoryVotes-icon', isDownvote && 'ResponseButton-icon--downvoted')} />
        <span>{downvotes.length}</span>
      </div>
    </div>
  );
};

Votes.propTypes = {
  upvotes: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  downvotes: PropTypes.array.isRequired,
  isUpvote: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isDownvote: PropTypes.bool.isRequired,
};

export default Votes;
