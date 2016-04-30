import cx from 'classnames';
import * as React from 'react';
import List from 'react-list';

import DraggableRow from './Row';
import SimpleRow from './SimpleRow';

const WaitList = ({
  className,
  users,
  onMoveUser,
  canMoveUsers
}) => {
  const Row = canMoveUsers ? DraggableRow : SimpleRow;
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
            className="UserList-row"
            position={index}
            user={users[index]}
            onMoveUser={onMoveUser(users[index])}
          />
        )}
        length={users.length}
        type="uniform"
      />
    </div>
  );
};

WaitList.propTypes = {
  className: React.PropTypes.string,
  users: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  canMoveUsers: React.PropTypes.boolean,
  onMoveUser: React.PropTypes.func.isRequired
};

export default WaitList;
