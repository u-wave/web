import React from 'react';
import PropTypes from 'prop-types';
import SadvoteIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import DownvoteIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UpvoteIcon from '@mui/icons-material/ThumbUp';

const Votes = ({
  upvote, downvote, sadvote, favorite, ...props
}) => (
  <div {...props}>
    {favorite && (
      <FavoriteIcon className="UserRow-voteIcon UserRow-voteIcon--favorite" />
    )}
    {sadvote && (
      <SadvoteIcon className="UserRow-voteIcon UserRow-voteIcon--sadvote" />
    )}
    {upvote && (
      <UpvoteIcon className="UserRow-voteIcon UserRow-voteIcon--upvote" />
    )}
    {downvote && (
      <DownvoteIcon className="UserRow-voteIcon UserRow-voteIcon--downvote" />
    )}
  </div>
);

Votes.propTypes = {
  upvote: PropTypes.bool,
  downvote: PropTypes.bool,
  sadvote: PropTypes.bool,
  favorite: PropTypes.bool,
};

export default Votes;
