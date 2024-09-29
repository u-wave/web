import IconButton from '@mui/material/IconButton';
import {
  mdiHeart, mdiHeartOutline, mdiThumbDown, mdiThumbUp,
} from '@mdi/js';
import SvgIcon from '../../../components/SvgIcon';

type VoteButtonsProps = {
  isUpvote: boolean,
  onUpvote: () => void,
  isDownvote: boolean,
  onDownvote: () => void,
  isFavorite: boolean,
  onFavorite: () => void,
};
function VoteButtons({
  isUpvote, onUpvote,
  isDownvote, onDownvote,
  isFavorite, onFavorite,
}: VoteButtonsProps) {
  return (
    <div className="VoteButtons">
      <IconButton onClick={onUpvote} className="VoteButtons-button">
        <SvgIcon path={mdiThumbUp} className={isUpvote ? 'ResponseButton-icon--upvoted' : undefined} />
      </IconButton>
      <IconButton onClick={onFavorite} className="VoteButtons-button">
        {isFavorite ? (
          <SvgIcon path={mdiHeart} className="ResponseButton-icon--favorite" />
        ) : (
          <SvgIcon path={mdiHeartOutline} />
        )}
      </IconButton>
      <IconButton onClick={onDownvote} className="VoteButtons-button">
        <SvgIcon path={mdiThumbDown} className={isDownvote ? 'ResponseButton-icon--downvoted' : undefined} />
      </IconButton>
    </div>
  );
}

export default VoteButtons;
