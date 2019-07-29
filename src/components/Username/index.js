import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import RoleColor from '../RoleColor';

const Username = ({ className, user }) => (
  <RoleColor className={cx('Username', className)} roles={user.roles}>
    {user.username}
  </RoleColor>
);

Username.propTypes = {
  className: PropTypes.string,
  user: PropTypes.shape({
    username: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default React.memo(Username);
