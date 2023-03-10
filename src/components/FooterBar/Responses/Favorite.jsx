import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';
import SvgIcon from '../../SvgIcon';
import Button from './Button';

function Favorite({
  onFavorite,
  count,
  disabled,
  active,
}) {
  const { t } = useTranslator();

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
      <SvgIcon
        path={active ? mdiHeart : mdiHeartOutline}
        className="ResponseButton-icon--favorite"
      />
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
