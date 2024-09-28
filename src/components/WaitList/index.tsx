import cx from 'clsx';
import { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import ModRow from './ModRow';
import SimpleRow from './SimpleRow';
import type { User } from '../../reducers/users';
import { isWaitlistDrag, isWaitlistDrop } from './drag';

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

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => isWaitlistDrag(source.data),
      onDrop({ source, location }) {
        if (!isWaitlistDrag(source.data)) return;
        const [target] = location.current.dropTargets;
        if (target == null || !isWaitlistDrop(target.data)) return;

        const { user } = source.data;
        const { position } = target.data;

        if (extractClosestEdge(target.data) === 'top') {
          onMoveUser(user, position);
        } else {
          onMoveUser(user, position + 1);
        }
      },
    });
  }, [onMoveUser]);

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
              onRemoveUser={() => onRemoveUser(user)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WaitList;
