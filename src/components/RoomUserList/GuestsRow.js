import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTranslator } from '@u-wave/react-translate';

function GuestsRow({ className, guests, style }) {
  const { t } = useTranslator();

  return (
    <ListItem component="div" className={cx('UserRow', 'UserRow--guests', className)} style={style}>
      <ListItemText
        classes={{ primary: 'UserRow-guestsText' }}
        primary={t('users.guests', { count: guests })}
      />
    </ListItem>
  );
}

GuestsRow.propTypes = {
  className: PropTypes.string,
  guests: PropTypes.number.isRequired,
  style: PropTypes.object,
};

export default GuestsRow;
