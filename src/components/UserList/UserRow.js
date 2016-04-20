import cx from 'classnames';
import * as React from 'react';

import Avatar from '../Avatar';
import Username from '../Username';

const UserRow = ({ className, user }) => (
  <div className={cx('UserRow', className)}>
    <Avatar
      className="UserRow-avatar"
      user={user}
    />
    <Username className="UserRow-username" user={user} />
  </div>
);

UserRow.propTypes = {
  className: React.PropTypes.string,
  user: React.PropTypes.object.isRequired
};

export default UserRow;
