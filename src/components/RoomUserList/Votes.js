import React from 'react';
import PropTypes from 'prop-types';
import DownvoteIcon from '@material-ui/icons/ThumbDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import UpvoteIcon from '@material-ui/icons/ThumbUp';
import SadvoteIcon from '@material-ui/icons/SentimentVeryDissatisfied';

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
