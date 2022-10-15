import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useVirtualizer } from '@tanstack/react-virtual';
import RoomUserRow from './Row';
import GuestsRow from './GuestsRow';

const {
  useRef,
} = React;

function estimateSize() {
  return 40;
}

function RoomUserList({ className, users, guests }) {
  const parentRef = useRef();

  const showGuests = guests > 0;
  // The "and X guests" row is implemented somewhat hackily as an extra user
  // row. To render properly at the end of the list, it needs to be rendered as
  // an element of the list--so we tell react-list that we have an extra row
  // when th guests row is shown.
  const length = users.length + (showGuests ? 1 : 0);

  const virtualizer = useVirtualizer({
    count: length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 12, // not that expensive to render
  });

  return (
    <div className={cx('UserList', 'UserList--online', className)} ref={parentRef}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
        {virtualizer.getVirtualItems().map(({ index, start }) => {
          const rowClass = cx(
            'UserList-row',
            (index % 2 === 0) && 'UserList-row--alternate',
          );
          const style = { transform: `translateY(${start}px)` };
          // The very last row is the guests row
          if (index === users.length) {
            return (
              <GuestsRow
                key="guests"
                className={rowClass}
                style={style}
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
        })}
      </div>
    </div>
  );
}

RoomUserList.propTypes = {
  className: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  guests: PropTypes.number.isRequired,
};

export default RoomUserList;
