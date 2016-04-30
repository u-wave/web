import cx from 'classnames';
import * as React from 'react';

import Avatar from '../Avatar';
import Username from '../Username';

import Position from './Position';

const SimpleRow = ({
  className,
  position,
  user
}) => (
  <div className={cx('UserRow', 'UserRow--queue', className)}>
    <Position position={position + 1} />
    <Avatar
      className="UserRow-avatar"
      user={user}
    />
    <Username
      className="UserRow-username"
      user={user}
    />
  </div>
);

SimpleRow.propTypes = {
  className: React.PropTypes.string,
  position: React.PropTypes.number.isRequired,
  user: React.PropTypes.object.isRequired
};

export default SimpleRow;
