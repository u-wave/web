import React from 'react';
import PropTypes from 'prop-types';
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
  isFavorite, onFavorite,
}) => (
  <div className="VoteButtons">
    <IconButton onClick={onUpvote}>
      <UpvoteIcon color={isUpvote ? '#4BB64B' : 'white'} />
    </IconButton>
    <IconButton onClick={onFavorite}>
      {isFavorite ? (
        <FavoritedIcon color={muiTheme.palette.primary1Color} />
      ) : (
        <FavoriteIcon color="white" />
      )}
    </IconButton>
    <IconButton onClick={onDownvote}>
      <DownvoteIcon color={isDownvote ? '#B64B4B' : 'white'} />
    </IconButton>
  </div>
);

VoteButtons.propTypes = {
  muiTheme: PropTypes.object.isRequired,

  isUpvote: PropTypes.bool,
  isFavorite: PropTypes.bool,
  isDownvote: PropTypes.bool,

  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
};

export default muiThemeable()(VoteButtons);
