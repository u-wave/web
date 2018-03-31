import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FavoritedIcon from 'material-ui-icons/Favorite';
import FavoriteIcon from 'material-ui-icons/FavoriteBorder';
import Button from './Button';

const enhance = translate();

const handleFavorite = onFavorite => (event) => {
  const pos = event.target.getBoundingClientRect();
  onFavorite({
    x: pos.left,
    y: pos.top,
  });
};

const Favorite = ({
  t,
  onFavorite,
  count,
  disabled,
  active,
}) => {
  const CurrentIcon = active ? FavoritedIcon : FavoriteIcon;

  return (
    <Button
      disabled={disabled}
      tooltip={t('votes.favorite')}
      onClick={handleFavorite(onFavorite)}
      count={count}
    >
      <CurrentIcon className="ResponseButton-icon--favorite" />
    </Button>
  );
};

Favorite.propTypes = {
  t: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

export default enhance(Favorite);
