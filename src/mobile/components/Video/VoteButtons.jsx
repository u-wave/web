import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import {
  mdiHeart, mdiHeartOutline, mdiThumbDown, mdiThumbUp,
} from '@mdi/js';
import SvgIcon from '../../../components/SvgIcon';

function VoteButtons({
  isUpvote, onUpvote,
  isDownvote, onDownvote,
  isFavorite, onFavorite,
}) {
  return (
    <div className="VoteButtons">
      <IconButton onClick={onUpvote} className="VoteButtons-button">
        <SvgIcon path={mdiThumbUp} className={cx(isUpvote && 'ResponseButton-icon--upvoted')} />
      </IconButton>
      <IconButton onClick={onFavorite} className="VoteButtons-button">
        {isFavorite ? (
          <SvgIcon path={mdiHeart} className="ResponseButton-icon--favorite" />
        ) : (
          <SvgIcon path={mdiHeartOutline} />
        )}
      </IconButton>
      <IconButton onClick={onDownvote} className="VoteButtons-button">
        <SvgIcon path={mdiThumbDown} className={cx(isDownvote && 'ResponseButton-icon--downvoted')} />
      </IconButton>
    </div>
  );
}

VoteButtons.propTypes = {
  isUpvote: PropTypes.bool,
  isFavorite: PropTypes.bool,
  isDownvote: PropTypes.bool,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default VoteButtons;
