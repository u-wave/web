import cx from 'classnames';
import * as React from 'react';
import List from 'react-list';

import RoomUserRow from './Row';

const RoomUserList = ({ className, users }) => (
  <div className={cx('UserList', 'UserList--online', className)}>
    <List
      itemRenderer={(index, key) => (
        <RoomUserRow
          key={key}
          className="UserList-row"
          user={users[index]}
        />
      )}
      length={users.length}
      type="uniform"
    />
  </div>
);

RoomUserList.propTypes = {
  className: React.PropTypes.string,
  users: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default RoomUserList;
