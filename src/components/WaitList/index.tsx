import cx from 'clsx';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import ModRow from './ModRow';
import SimpleRow from './SimpleRow';
import { User } from '../../reducers/users';

function estimateSize() {
  return 40;
}

type WaitListProps = {
  className?: string,
  users: User[],
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

          return (
            <Row
              key={users[index]._id}
              className={cx('UserList-row', index % 2 === 0 && 'UserList-row--alternate')}
              style={style}
              position={index}
              user={users[index]}
              onMoveUser={(position) => onMoveUser(users[index], position)}
              onRemoveUser={() => onRemoveUser(users[index])}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WaitList;
