import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { translate } from '@u-wave/react-translate';

const GuestsRow = ({ t, className, guests }) => (
  <ListItem className={cx('UserRow', 'UserRow--guests', className)}>
    <ListItemText
      classes={{ primary: 'UserRow-guestsText' }}
      primary={t('users.guests', { count: guests })}
    />
  </ListItem>
);

GuestsRow.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  guests: PropTypes.number.isRequired,
};

export default translate()(GuestsRow);
