import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ModRow from './ModRow';
import SimpleRow from './SimpleRow';

const WaitList = ({
  className,
  users,
  onMoveUser,
  onRemoveUser,
  canMoveUsers,
}) => {
  const Row = canMoveUsers ? ModRow : SimpleRow;

  // these are not components
  /* eslint-disable react/prop-types */
  const renderRow = ({ index, style }) => (
    <Row
      key={users[index]._id}
      className={cx('UserList-row', index % 2 === 0 && 'UserList-row--alternate')}
      style={style}
      position={index}
      user={users[index]}
      onMoveUser={position => onMoveUser(users[index], position)}
      onRemoveUser={() => onRemoveUser(users[index])}
    />
  );

  const renderList = ({ height }) => (
    <FixedSizeList
      height={height}
      itemCount={users.length}
      itemSize={40}
    >
      {renderRow}
    </FixedSizeList>
  );
  /* eslint-enable react/prop-types */

  return (
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
};

WaitList.propTypes = {
  className: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  canMoveUsers: PropTypes.bool.isRequired,
  onMoveUser: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
};

export default WaitList;
