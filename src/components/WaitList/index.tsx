import cx from 'clsx';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import ModRow from './ModRow';
import SimpleRow from './SimpleRow';
import type { User } from '../../reducers/users';

function estimateSize() {
  return 40;
}

type WaitListProps = {
  className?: string,
  users: (User | undefined)[],
  onMoveUser: (user: User, position: number) => void,
  onRemoveUser: (user: User) => void,
  canMoveUsers: boolean,
};
function WaitList({
  className,
  users,
  onMoveUser,
  onRemoveUser,
  canMoveUsers,
}: WaitListProps) {
  const Row = canMoveUsers ? ModRow : SimpleRow;
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 12, // not that expensive to render
  });

  return (
    <div
      className={cx(
        'UserList',
        'UserList--queue',
        'WaitList',
        className,
      )}
      ref={parentRef}
    >
      <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
        {virtualizer.getVirtualItems().map(({ index, start }) => {
          const style = { transform: `translateY(${start}px)` };
          const user = users[index]!;
          if (user == null) {
            // FIXME this means the waitlist is out of sync with online users state
            // Returning null avoids a crash but isn't pretty
            return null;
          }

          return (
            <Row
              key={user._id}
              className={cx('UserList-row', index % 2 === 0 && 'UserList-row--alternate')}
              style={style}
              position={index}
              user={user}
              onMoveUser={(position) => onMoveUser(user, position)}
              onRemoveUser={() => onRemoveUser(user)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WaitList;
