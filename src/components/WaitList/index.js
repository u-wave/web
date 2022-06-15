import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useVirtualizer } from '@tanstack/react-virtual';
import ModRow from './ModRow';
import SimpleRow from './SimpleRow';

const {
  useRef,
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

WaitList.propTypes = {
  className: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  canMoveUsers: PropTypes.bool.isRequired,
  onMoveUser: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
};

export default WaitList;
