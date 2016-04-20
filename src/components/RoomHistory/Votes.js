import * as React from 'react';
import DownvoteIcon from 'material-ui/lib/svg-icons/action/thumb-down';
import UpvoteIcon from 'material-ui/lib/svg-icons/action/thumb-up';
import FavoritedIcon from 'material-ui/lib/svg-icons/action/favorite';
import FavoriteIcon from 'material-ui/lib/svg-icons/action/favorite-border';

import theme from '../../MuiTheme';

const iconStyles = {
  height: 36,
  width: 36,
  padding: '6px 12px 6px 0'
};

const Votes = ({ upvotes, downvotes, favorites, isUpvote, isDownvote, isFavorite }) => {
  const CurrentFavoriteIcon = isFavorite ? FavoritedIcon : FavoriteIcon;
  return (
    <div className="HistoryVotes AudienceResponse">
      <div className="ResponseButton">
        <UpvoteIcon
          style={iconStyles}
          color={isUpvote ? '#4BB64B' : 'white'}
        />
        <span className="ResponseButton-count">{upvotes.length}</span>
      </div>
      <div className="ResponseButton">
        <CurrentFavoriteIcon
          style={iconStyles}
          color={theme.palette.primary1Color}
        />
        <span className="ResponseButton-count">{favorites.length}</span>
      </div>
      <div className="ResponseButton">
        <DownvoteIcon
          style={iconStyles}
          color={isDownvote ? '#B64B4B' : 'white'}
        />
        <span className="ResponseButton-count">{downvotes.length}</span>
      </div>
    </div>
  );
};

Votes.propTypes = {
  upvotes: React.PropTypes.array.isRequired,
  favorites: React.PropTypes.array.isRequired,
  downvotes: React.PropTypes.array.isRequired,
  isUpvote: React.PropTypes.bool.isRequired,
  isFavorite: React.PropTypes.bool.isRequired,
  isDownvote: React.PropTypes.bool.isRequired
};

export default Votes;
