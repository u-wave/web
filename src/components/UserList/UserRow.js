import cx from 'classnames';
import React from 'react';

import Avatar from '../Avatar';
import Username from '../Username';

const UserRow = ({ className, user }) => {
  return (
    <div className={cx('UserRow', className)}>
      <Avatar
        className="UserRow-avatar"
        user={user}
      />
      <Username className="UserRow-username" user={user} />
    </div>
  );
};

export default UserRow;
