/* eslint-disable react/no-multi-comp */
import cx from 'classnames';
import * as React from 'react';
import List from 'react-list';
import UserRow from './UserRow';

const UserList = ({ className, users }) => (
  <div className={cx('UserList', className)}>
    <List
      itemRenderer={(index, key) => (
        <UserRow
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

UserList.propTypes = {
  className: React.PropTypes.string,
  users: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default UserList;
