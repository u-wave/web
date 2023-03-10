import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import {
  mdiHeart, mdiHeartOutline, mdiThumbDown, mdiThumbUp,
} from '@mdi/js';
import SvgIcon from '../SvgIcon';

function Votes({
  upvotes, downvotes, favorites, isUpvote, isDownvote, isFavorite,
}) {
  return (
    <div className="HistoryVotes AudienceResponse">
      <div className="ResponseButton ResponseButton--static">
        <div className="ResponseButton-content">
          <SvgIcon path={mdiThumbUp} className={cx('HistoryVotes-icon', isUpvote && 'ResponseButton-icon--upvoted')} />
          <span className="ResponseButton-count">{upvotes.length}</span>
        </div>
      </div>
      <div className="ResponseButton ResponseButton--static">
        <div className="ResponseButton-content">
          <SvgIcon
            path={isFavorite ? mdiHeart : mdiHeartOutline}
            className="HistoryVotes-icon ResponseButton-icon--favorite"
          />
          <span className="ResponseButton-count">{favorites.length}</span>
        </div>
      </div>
      <div className="ResponseButton ResponseButton--static">
        <div className="ResponseButton-content">
          <SvgIcon path={mdiThumbDown} className={cx('HistoryVotes-icon', isDownvote && 'ResponseButton-icon--downvoted')} />
          <span className="ResponseButton-count">{downvotes.length}</span>
        </div>
      </div>
    </div>
  );
}

Votes.propTypes = {
  upvotes: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  downvotes: PropTypes.array.isRequired,
  isUpvote: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isDownvote: PropTypes.bool.isRequired,
};

export default React.memo(Votes);
