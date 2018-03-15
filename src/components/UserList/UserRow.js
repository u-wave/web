import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
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
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default UserRow;
