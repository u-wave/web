import React from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import DownvoteIcon from 'material-ui/svg-icons/action/thumb-down';
import UpvoteIcon from 'material-ui/svg-icons/action/thumb-up';
import FavoritedIcon from 'material-ui/svg-icons/action/favorite';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite-border';

const iconStyles = {
  height: 16,
  width: 22,
  padding: '0 4px 0 2px',
  verticalAlign: 'top',
};

const enhance = muiThemeable();

const Votes = ({
  muiTheme, upvotes, downvotes, favorites, isUpvote, isDownvote, isFavorite,
}) => {
  const CurrentFavoriteIcon = isFavorite ? FavoritedIcon : FavoriteIcon;
  return (
    <div className="MobileHistoryVotes">
      <div className="MobileHistoryVotes-vote">
        <UpvoteIcon
          style={iconStyles}
          color={isUpvote ? '#4BB64B' : 'white'}
        />
        <span>{upvotes.length}</span>
      </div>
      <div className="MobileHistoryVotes-vote">
        <CurrentFavoriteIcon
          style={iconStyles}
          color={muiTheme.palette.primary1Color}
        />
        <span>{favorites.length}</span>
      </div>
      <div className="MobileHistoryVotes-vote">
        <DownvoteIcon
          style={iconStyles}
          color={isDownvote ? '#B64B4B' : 'white'}
        />
        <span>{downvotes.length}</span>
      </div>
    </div>
  );
};

Votes.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  upvotes: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  downvotes: PropTypes.array.isRequired,
  isUpvote: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isDownvote: PropTypes.bool.isRequired,
};

export default enhance(Votes);
