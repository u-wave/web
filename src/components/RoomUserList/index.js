import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import useDirection from '../../hooks/useDirection';
import RoomUserRow from './Row';
import GuestsRow from './GuestsRow';

const RoomUserList = ({ className, users, guests }) => {
  const direction = useDirection();

  const showGuests = guests > 0;
  // The "and X guests" row is implemented somewhat hackily as an extra user
  // row. To render properly at the end of the list, it needs to be rendered as
  // an element of the list--so we tell react-list that we have an extra row
  // when th guests row is shown.
  const length = users.length + (showGuests ? 1 : 0);

  // these are not components
  /* eslint-disable react/prop-types */

  function itemRenderer({ index, style }) {
    const rowClass = cx(
      'UserList-row',
      (index % 2 === 0) && 'UserList-row--alternate',
    );
    // The very last row is the guests row
    if (index === users.length) {
      return (
        <GuestsRow
          key="guests"
          className={rowClass}
          guests={guests}
        />
      );
    }
    return (
      <RoomUserRow
        key={users[index]._id}
        className={rowClass}
        style={style}
        user={users[index]}
      />
    );
  }

  function listRenderer({ height }) {
    return (
      <FixedSizeList
        height={height}
        itemCount={length}
        itemSize={40}
        direction={direction}
      >
        {itemRenderer}
      </FixedSizeList>
    );
  }

  /* eslint-enable react/prop-types */

  return (
    <div className={cx('UserList', 'UserList--online', className)}>
      <AutoSizer disableWidth>
        {listRenderer}
      </AutoSizer>
    </div>
  );
};

RoomUserList.propTypes = {
  className: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  guests: PropTypes.number.isRequired,
};

export default RoomUserList;
