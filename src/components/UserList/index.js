/* eslint-disable react/no-multi-comp */
import cx from 'classnames';
import React from 'react';
import List from 'react-list';
import UserRow from './UserRow';

const UserList = ({ className, users }) => {
  return (
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
};

export default UserList;
