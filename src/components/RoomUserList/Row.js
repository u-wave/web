import cx from 'classnames';
import * as React from 'react';

import Avatar from '../Avatar';
import Username from '../Username';
import Votes from './Votes';

const RoomUserRow = ({ className, user }) => (
  <div className={cx('UserRow', className)}>
    <Avatar
      className="UserRow-avatar"
      user={user}
    />
    <Username className="UserRow-username" user={user} />
    <Votes className="UserRow-votes" {...user.votes} />
  </div>
);

RoomUserRow.propTypes = {
  className: React.PropTypes.string,
  user: React.PropTypes.object.isRequired
};

export default RoomUserRow;
