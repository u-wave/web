import cx from 'classnames';
import React from 'react';
import Avatar from '../Avatar';

const UserRow = ({ className, user }) => {
  return (
    <div className={cx('UserRow', className)}>
      <Avatar
        className="UserRow-avatar"
        user={user}
      />
      <span className="UserRow-username">{user.username}</span>
    </div>
  );
};

export default UserRow;
