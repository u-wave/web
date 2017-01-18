import * as React from 'react';
import BaseVideo from '../../components/Video';

import VoteButtons from './VoteButtons';

const Video = ({
  enabled,
  isUpvote,
  isFavorite,
  isDownvote,
  onUpvote,
  onDownvote,
  onFavorite
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
  enabled: React.PropTypes.bool,

  isUpvote: React.PropTypes.bool,
  isFavorite: React.PropTypes.bool,
  isDownvote: React.PropTypes.bool,

  onUpvote: React.PropTypes.func.isRequired,
  onDownvote: React.PropTypes.func.isRequired,
  onFavorite: React.PropTypes.func.isRequired
};

export default Video;
