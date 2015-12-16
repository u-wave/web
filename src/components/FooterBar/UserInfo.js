import cx from 'classnames';
import React from 'react';
import Avatar from '../Avatar';

const UserInfo = ({ className, user, ...attrs }) => {
  return (
    <div className={cx('UserInfo', className)} {...attrs}>
      <Avatar
        className="UserInfo-avatar"
        user={user}
      />
    </div>
  );
};

export default UserInfo;
