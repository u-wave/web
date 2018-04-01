import React from 'react';
import PropTypes from 'prop-types';
import BaseVideo from '../../../components/Video';
import VoteButtons from './VoteButtons';

const Video = ({
  voteStats,
  onUpvote,
  onDownvote,
  onFavorite,
  ...props
}) => (
  <div>
    <BaseVideo
      {...props}
      size="large"
    />
    <VoteButtons
      {...voteStats}
      onUpvote={onUpvote}
      onDownvote={onDownvote}
      onFavorite={onFavorite}
    />
  </div>
);

Video.propTypes = {
  voteStats: PropTypes.shape({
    isUpvote: PropTypes.bool,
    isFavorite: PropTypes.bool,
    isDownvote: PropTypes.bool,
  }),

  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default Video;
