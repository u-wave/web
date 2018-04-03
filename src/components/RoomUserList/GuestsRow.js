import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from 'material-ui/List';
import { translate } from 'react-i18next';

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
