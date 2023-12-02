import cx from 'clsx';
import PropTypes from 'prop-types';
import {
  mdiHeart, mdiHeartOutline, mdiThumbDown, mdiThumbUp,
} from '@mdi/js';
import SvgIcon from '../SvgIcon';
import useCurrentUser from '../../hooks/useCurrentUser';

function Votes({ upvotes, downvotes, favorites }) {
  const user = useCurrentUser();
  const isUpvote = user ? upvotes.includes(user._id) : false;
  const isDownvote = user ? downvotes.includes(user._id) : false;
  const isFavorite = user ? favorites.includes(user._id) : false;

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
};

export default Votes;
