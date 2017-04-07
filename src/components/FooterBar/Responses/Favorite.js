import React from 'react';
import PropTypes from 'prop-types';
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
  t: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  onFavorite: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool
};

export default compose(
  translate(),
  muiThemeable()
)(Favorite);
