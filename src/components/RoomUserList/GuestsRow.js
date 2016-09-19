import cx from 'classnames';
import * as React from 'react';
import { translate } from 'react-i18next';

const GuestsRow = ({ t, className, guests }) => (
  <div className={cx('UserRow', 'UserRow--guests', className)}>
    {t('users.guests', { count: guests })}
  </div>
);

GuestsRow.propTypes = {
  t: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  guests: React.PropTypes.number.isRequired
};

export default translate()(GuestsRow);
