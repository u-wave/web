import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import SadvoteIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import DownvoteIcon from '@mui/icons-material/ThumbDown';
import UpvoteIcon from '@mui/icons-material/ThumbUp';
import FavoritedIcon from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';

function Votes({
  upvotes, downvotes, sadvotes, favorites, isUpvote, isDownvote, isSadvote, isFavorite,
}) {
  const CurrentFavoriteIcon = isFavorite ? FavoritedIcon : FavoriteIcon;
  return (
    <div className="HistoryVotes AudienceResponse">
      <div className="ResponseButton ResponseButton--static">
        <div className="ResponseButton-content">
          <SadvoteIcon className={cx('HistoryVotes-icon', isSadvote && 'ResponseButton-icon--sadvoted')} />
          <span className="ResponseButton-count">{sadvotes.length}</span>
        </div>
      </div>
      <div className="ResponseButton ResponseButton--static">
        <div className="ResponseButton-content">
          <UpvoteIcon className={cx('HistoryVotes-icon', isUpvote && 'ResponseButton-icon--upvoted')} />
          <span className="ResponseButton-count">{upvotes.length}</span>
        </div>
      </div>
      <div className="ResponseButton ResponseButton--static">
        <div className="ResponseButton-content">
          <CurrentFavoriteIcon className="HistoryVotes-icon ResponseButton-icon--favorite" />
          <span className="ResponseButton-count">{favorites.length}</span>
        </div>
      </div>
      <div className="ResponseButton ResponseButton--static">
        <div className="ResponseButton-content">
          <DownvoteIcon className={cx('HistoryVotes-icon', isDownvote && 'ResponseButton-icon--downvoted')} />
          <span className="ResponseButton-count">{downvotes.length}</span>
        </div>
      </div>
    </div>
  );
}

Votes.defaultProps = {
  sadvotes: [],
};

Votes.propTypes = {
  upvotes: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  downvotes: PropTypes.array.isRequired,
  sadvotes: PropTypes.array,
  isUpvote: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isDownvote: PropTypes.bool.isRequired,
  isSadvote: PropTypes.bool.isRequired,
};

export default React.memo(Votes);
