import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const GuestsRow = ({ t, className, guests }) => (
  <div className={cx('UserRow', 'UserRow--guests', className)}>
    {t('users.guests', { count: guests })}
  </div>
);

GuestsRow.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  guests: PropTypes.number.isRequired,
};

export default translate()(GuestsRow);
