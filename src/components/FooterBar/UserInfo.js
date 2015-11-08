import cx from 'classnames';
import React from 'react';
import Avatar from '../Avatar';

const UserInfo = ({ className, user }) => {
  return (
    <div className={cx('UserInfo', className)}>
      <Avatar
        className="UserInfo-avatar"
        user={user}
      />
    </div>
  );
};

export default UserInfo;
