import * as React from 'react';
import { translate } from 'react-i18next';
import compose from 'recompose/compose';
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
  t,
  muiTheme,
  onFavorite,
  count,
  disabled,
  active
}) => {
  const CurrentIcon = active ? FavoritedIcon : FavoriteIcon;

  return (
    <Button
      disabled={disabled}
      tooltip={t('votes.favorite')}
      onClick={handleFavorite(onFavorite)}
      count={count}
    >
      <CurrentIcon color={muiTheme.palette.primary1Color} />
    </Button>
  );
};

Favorite.propTypes = {
  t: React.PropTypes.func.isRequired,
  muiTheme: React.PropTypes.object.isRequired,
  onFavorite: React.PropTypes.func.isRequired,
  count: React.PropTypes.number.isRequired,
  disabled: React.PropTypes.bool,
  active: React.PropTypes.bool
};

export default compose(
  translate(),
  muiThemeable()
)(Favorite);
