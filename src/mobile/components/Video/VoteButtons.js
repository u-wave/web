import * as React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import IconButton from 'material-ui/IconButton';
import FavoritedIcon from 'material-ui/svg-icons/action/favorite';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite-border';
import DownvoteIcon from 'material-ui/svg-icons/action/thumb-down';
import UpvoteIcon from 'material-ui/svg-icons/action/thumb-up';

const VoteButtons = ({
  muiTheme,
  isUpvote, onUpvote,
  isDownvote, onDownvote,
  isFavorite, onFavorite
}) => (
  <div className="VoteButtons">
    <IconButton onTouchTap={onUpvote}>
      <UpvoteIcon color={isUpvote ? '#4BB64B' : 'white'} />
    </IconButton>
    <IconButton onTouchTap={onFavorite}>
      {isFavorite ? (
        <FavoritedIcon color={muiTheme.palette.primary1Color} />
      ) : (
        <FavoriteIcon color="white" />
      )}
    </IconButton>
    <IconButton onTouchTap={onDownvote}>
      <DownvoteIcon color={isDownvote ? '#B64B4B' : 'white'} />
    </IconButton>
  </div>
);

VoteButtons.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,

  isUpvote: React.PropTypes.bool,
  isFavorite: React.PropTypes.bool,
  isDownvote: React.PropTypes.bool,

  onUpvote: React.PropTypes.func.isRequired,
  onDownvote: React.PropTypes.func.isRequired,
  onFavorite: React.PropTypes.func.isRequired
};

export default muiThemeable()(VoteButtons);
