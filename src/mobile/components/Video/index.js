import React from 'react';
import PropTypes from 'prop-types';
import BaseVideo from '../../components/Video';
import VoteButtons from './VoteButtons';

const Video = ({
  enabled,
  isUpvote,
  isFavorite,
  isDownvote,
  onUpvote,
  onDownvote,
  onFavorite,
}) => (
  <div>
    <BaseVideo
      enabled={enabled}
      size="large"
    />
    <VoteButtons
      isUpvote={isUpvote}
      isFavorite={isFavorite}
      isDownvote={isDownvote}
      onUpvote={onUpvote}
      onDownvote={onDownvote}
      onFavorite={onFavorite}
    />
  </div>
);

Video.propTypes = {
  enabled: PropTypes.bool,

  isUpvote: PropTypes.bool,
  isFavorite: PropTypes.bool,
  isDownvote: PropTypes.bool,

  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default Video;
