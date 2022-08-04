import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useVirtualizer } from '@tanstack/react-virtual';
import ModRow from './ModRow';
import SimpleRow from './SimpleRow';

const {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} = React;

function estimateSize() {
  return 40;
}

function WaitList({
  className,
  users,
  onMoveUser,
  onRemoveUser,
  canMoveUsers,
}) {
  const Row = canMoveUsers ? ModRow : SimpleRow;
  const parentRef = useRef();
  const [activeID, setActiveID] = useState(null);
  const [overID, setOverID] = useState(null);
  const userIDs = useMemo(() => users.map((user) => user._id), [users]);
  const sortedUsers = useMemo(() => {
    if (!activeID || !overID) return users;
    const activeIndex = userIDs.indexOf(activeID);
    const overIndex = userIDs.indexOf(overID);
    return arrayMove(users, activeIndex, overIndex);
  }, [activeID, overID, users, userIDs]);
  const [optimisticUsers, setOptimisticUsers] = useState(users);

  // `optimisticUsers` contains changes from the most recent drag operation. If
  // we get a new `users` array, we assume it has those changes applied, so we
  // can forget about our enqueued change.
  useEffect(() => {
    setOptimisticUsers(users);
  }, [users]);

  // The `optimisticUsers` and `users` use below is a bit wonky. It's the result of
  // some trial and error. Maybe it can be improved in the future…

  const virtualizer = useVirtualizer({
    count: optimisticUsers.length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 12, // not that expensive to render
  });

  const list = (
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
              key={optimisticUsers[index]._id}
              className={cx('UserList-row', index % 2 === 0 && 'UserList-row--alternate')}
              style={style}
              position={sortedUsers.indexOf(users[index])}
              user={optimisticUsers[index]}
              onMoveUser={(position) => onMoveUser(optimisticUsers[index], position)}
              onRemoveUser={() => onRemoveUser(optimisticUsers[index])}
            />
          );
        })}
      </div>
    </div>
  );

  const handleDragStart = useCallback((event) => {
    setActiveID(event.active.id);
  }, []);

  const handleDragOver = useCallback((event) => {
    setActiveID(event.active?.id);
    setOverID(event.over?.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    setActiveID(null);
    setOverID(null);

    const { active, over } = event;
    if (active.id !== over.id) {
      const activeUser = users.find((u) => u._id === active.id);
      const activeIndex = userIDs.indexOf(active.id);
      const overIndex = userIDs.indexOf(over.id);
      // This is a very weird behaviour on the server side :)
      const moveIndex = activeIndex > overIndex ? overIndex : overIndex + 1;
      onMoveUser(activeUser, moveIndex);
      setOptimisticUsers(arrayMove(users, activeIndex, overIndex));
    }
  }, [users, userIDs, onMoveUser]);

  if (canMoveUsers) {
    return (
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext strategy={verticalListSortingStrategy} items={userIDs}>
          {list}
        </SortableContext>
      </DndContext>
    );
  }

  return list;
}

WaitList.propTypes = {
  className: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  canMoveUsers: PropTypes.bool.isRequired,
  onMoveUser: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
};

export default WaitList;
