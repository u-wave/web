import React from 'react';
import PropTypes from 'prop-types';
import DownvoteIcon from 'material-ui/svg-icons/action/thumb-down';
import UpvoteIcon from 'material-ui/svg-icons/action/thumb-up';
import FavoritedIcon from 'material-ui/svg-icons/action/favorite';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite-border';

import theme from '../../MuiTheme';

const iconStyles = {
  height: 36,
  width: 36,
  padding: '6px 12px 6px 0',
};

const Votes = ({
  upvotes, downvotes, favorites, isUpvote, isDownvote, isFavorite,
}) => {
  const CurrentFavoriteIcon = isFavorite ? FavoritedIcon : FavoriteIcon;
  return (
    <div className="HistoryVotes AudienceResponse">
      <div className="ResponseButton ResponseButton--static">
        <div className="ResponseButton-content">
          <UpvoteIcon
            style={iconStyles}
            color={isUpvote ? '#4BB64B' : 'white'}
          />
          <span className="ResponseButton-count">{upvotes.length}</span>
        </div>
      </div>
      <div className="ResponseButton ResponseButton--static">
        <div className="ResponseButton-content">
          <CurrentFavoriteIcon
            style={iconStyles}
            color={theme.palette.primary1Color}
          />
          <span className="ResponseButton-count">{favorites.length}</span>
        </div>
      </div>
      <div className="ResponseButton ResponseButton--static">
        <div className="ResponseButton-content">
          <DownvoteIcon
            style={iconStyles}
            color={isDownvote ? '#B64B4B' : 'white'}
          />
          <span className="ResponseButton-count">{downvotes.length}</span>
        </div>
      </div>
    </div>
  );
};

Votes.propTypes = {
  upvotes: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  downvotes: PropTypes.array.isRequired,
  isUpvote: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isDownvote: PropTypes.bool.isRequired,
};

export default Votes;
