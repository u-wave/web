import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import DownvoteIcon from '@material-ui/icons/ThumbDown';
import UpvoteIcon from '@material-ui/icons/ThumbUp';
import SadvoteIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import FavoritedIcon from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';

const Votes = ({
  upvotes, downvotes, sadvotes, favorites, isUpvote, isDownvote, isSadvote, isFavorite,
}) => {
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
};

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

export default Votes;
