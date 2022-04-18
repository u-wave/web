import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTranslator } from '@u-wave/react-translate';

function GuestsRow({ className, guests }) {
  const { t } = useTranslator();

  return (
    <ListItem className={cx('UserRow', 'UserRow--guests', className)}>
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
};

export default GuestsRow;
