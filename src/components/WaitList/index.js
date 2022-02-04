import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import useDirection from '../../hooks/useDirection';
import ModRow from './ModRow';
import SimpleRow from './SimpleRow';

const {
  useCallback,
  useEffect,
  useMemo,
  useState,
} = React;

function WaitList({
  className,
  users,
  onMoveUser,
  onRemoveUser,
  canMoveUsers,
}) {
  const direction = useDirection();
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
  const Row = canMoveUsers ? ModRow : SimpleRow;

  // `optimisticUsers` contains changes from the most recent drag operation. If
  // we get a new `users` array, we assume it has those changes applied, so we
  // can forget about our enqueued change.
  useEffect(() => {
    setOptimisticUsers(users);
  }, [users]);

  // The `optimisticUsers` and `users` use below is a bit wonky. It's the result of
  // some trial and error. Maybe it can be improved in the future…

  // These are not components, so they do not have prop types.
  /* eslint-disable react/prop-types */
  const renderRow = ({ index, style }) => (
    <Row
      key={optimisticUsers[index]._id}
      className={cx('UserList-row', index % 2 === 0 && 'UserList-row--alternate')}
      style={style}
      position={sortedUsers.indexOf(users[index])}
      user={optimisticUsers[index]}
      onRemoveUser={() => onRemoveUser(optimisticUsers[index])}
    />
  );

  const renderList = ({ height }) => (
    <FixedSizeList
      height={height}
      itemCount={optimisticUsers.length}
      itemSize={40}
      direction={direction}
    >
      {renderRow}
    </FixedSizeList>
  );
  /* eslint-enable react/prop-types */

  const list = (
    <div
      className={cx(
        'UserList',
        'UserList--queue',
        'WaitList',
        className,
      )}
    >
      <AutoSizer disableWidth>
        {renderList}
      </AutoSizer>
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
