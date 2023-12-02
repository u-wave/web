import cx from 'clsx';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import RoomUserRow, { RoomUser } from './Row';
import GuestsRow from './GuestsRow';

function estimateSize() {
  return 40;
}

type RoomUserListProps = {
  className?: string,
  users: RoomUser[],
  guests: number,
};
function RoomUserList({ className, users, guests }: RoomUserListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const showGuests = guests > 0;
  // The "and X guests" row is implemented somewhat hackily as an extra user
  // row. To render properly at the end of the list, it needs to be rendered as
  // an element of the list--so we tell react-virtual that we have an extra row
  // when the guests row is shown.
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

          const user = users[index]!;
          return (
            <RoomUserRow
              key={user._id}
              className={rowClass}
              style={style}
              user={user}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RoomUserList;
