import cx from 'clsx';
import PropTypes from 'prop-types';
import {
  mdiHeart, mdiHeartOutline, mdiThumbDown, mdiThumbUp,
} from '@mdi/js';
import SvgIcon from '../../../components/SvgIcon';
import useCurrentUser from '../../../hooks/useCurrentUser';

function Votes({ upvotes, downvotes, favorites }) {
  const user = useCurrentUser();
  const isUpvote = user ? upvotes.includes(user._id) : false;
  const isDownvote = user ? downvotes.includes(user._id) : false;
  const isFavorite = user ? favorites.includes(user._id) : false;

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
};

export default Votes;
