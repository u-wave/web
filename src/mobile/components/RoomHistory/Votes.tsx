import cx from 'clsx';
import {
  mdiHeart, mdiHeartOutline, mdiThumbDown, mdiThumbUp,
} from '@mdi/js';
import SvgIcon from '../../../components/SvgIcon';
import useCurrentUser from '../../../hooks/useCurrentUser';

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

export default Votes;
