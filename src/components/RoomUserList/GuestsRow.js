import cx from 'classnames';
import * as React from 'react';

const inflect = n => (n !== 1 ? 's' : '');

const GuestsRow = ({ className, guests }) => (
  <div className={cx('UserRow', 'UserRow--guests', className)}>
    and {guests} guest{inflect(guests)}
  </div>
);

GuestsRow.propTypes = {
  className: React.PropTypes.string,
  guests: React.PropTypes.number.isRequired
};

export default GuestsRow;
