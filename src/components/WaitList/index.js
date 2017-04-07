import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import List from 'react-list';
import ModRow from './ModRow';
import SimpleRow from './SimpleRow';

const WaitList = ({
  className,
  users,
  onMoveUser,
  onRemoveUser,
  canMoveUsers
}) => {
  const Row = canMoveUsers ? ModRow : SimpleRow;
  return (
    <div
      className={cx(
        'UserList',
        'UserList--queue',
        'WaitList',
        className
      )}
    >
      <List
        itemRenderer={(index, key) => (
          <Row
            key={key}
            className={cx('UserList-row', index % 2 === 0 && 'UserList-row--alternate')}
            position={index}
            user={users[index]}
            onMoveUser={position => onMoveUser(users[index], position)}
            onRemoveUser={() => onRemoveUser(users[index])}
          />
        )}
        length={users.length}
        type="uniform"
      />
    </div>
  );
};

WaitList.propTypes = {
  className: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  canMoveUsers: PropTypes.bool.isRequired,
  onMoveUser: PropTypes.func.isRequired,
  onRemoveUser: PropTypes.func.isRequired
};

export default WaitList;
