import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import FavoritedIcon from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import Button from './Button';

function Favorite({
  onFavorite,
  count,
  disabled,
  active,
}) {
  const { t } = useTranslator();

  const CurrentIcon = active ? FavoritedIcon : FavoriteIcon;
  const handleFavorite = (event) => {
    const pos = event.target.getBoundingClientRect();
    onFavorite({
      x: pos.left,
      y: pos.top,
    });
  };

  return (
    <Button
      disabled={disabled}
      tooltip={t('votes.favorite')}
      onClick={handleFavorite}
      count={count}
    >
      <CurrentIcon className="ResponseButton-icon--favorite" />
    </Button>
  );
}

Favorite.propTypes = {
  onFavorite: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

export default Favorite;
