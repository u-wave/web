import cx from 'clsx';
import {
  mdiHeart, mdiHeartOutline, mdiThumbDown, mdiThumbUp,
} from '@mdi/js';
import SvgIcon from '../SvgIcon';
import useCurrentUser from '../../hooks/useCurrentUser';

type VotesProps = {
  upvotes: string[],
  downvotes: string[],
  favorites: string[],
};
function Votes({ upvotes, downvotes, favorites }: VotesProps) {
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

export default Votes;
