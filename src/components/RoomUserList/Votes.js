import React from 'react';
import PropTypes from 'prop-types';
import DownvoteIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UpvoteIcon from '@mui/icons-material/ThumbUp';

const Votes = ({
  upvote, downvote, favorite, ...props
}) => (
  <div {...props}>
    {favorite && (
      <FavoriteIcon className="UserRow-voteIcon UserRow-voteIcon--favorite" />
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
  favorite: PropTypes.bool,
};

export default Votes;
