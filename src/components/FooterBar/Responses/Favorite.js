import * as React from 'react';
import FavoritedIcon from 'material-ui/svg-icons/action/favorite';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite-border';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Button from './Button';

const handleFavorite = onFavorite => (event) => {
  const pos = event.target.getBoundingClientRect();
  onFavorite({
    x: pos.left,
    y: pos.top
  });
};

const Favorite = ({
  muiTheme,
  onFavorite,
  count,
  active
}) => {
  const CurrentIcon = active ? FavoritedIcon : FavoriteIcon;

  return (
    <Button
      tooltip="Favorite"
      onClick={handleFavorite(onFavorite)}
      count={count}
    >
      <CurrentIcon color={muiTheme.palette.primary1Color} />
    </Button>
  );
};

Favorite.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  onFavorite: React.PropTypes.func.isRequired,
  count: React.PropTypes.number.isRequired,
  active: React.PropTypes.bool
};

export default muiThemeable()(Favorite);
