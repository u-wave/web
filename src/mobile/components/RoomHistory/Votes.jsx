import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import {
  mdiHeart, mdiHeartOutline, mdiThumbDown, mdiThumbUp,
} from '@mdi/js';
import SvgIcon from '../../../components/SvgIcon';

function Votes({
  upvotes, downvotes, favorites, isUpvote, isDownvote, isFavorite,
}) {
  return (
    <div className="MobileHistoryVotes">
      <div className="MobileHistoryVotes-vote">
        <SvgIcon path={mdiThumbUp} className={cx('MobileHistoryVotes-icon', isUpvote && 'ResponseButton-icon--upvoted')} />
        <span>{upvotes.length}</span>
      </div>
      <div className="MobileHistoryVotes-vote">
        <SvgIcon path={isFavorite ? mdiHeart : mdiHeartOutline} className="MobileHistoryVotes-icon ResponseButton-icon--favorite" />
        <span>{favorites.length}</span>
      </div>
      <div className="MobileHistoryVotes-vote">
        <SvgIcon path={mdiThumbDown} className={cx('MobileHistoryVotes-icon', isDownvote && 'ResponseButton-icon--downvoted')} />
        <span>{downvotes.length}</span>
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

export default Votes;
