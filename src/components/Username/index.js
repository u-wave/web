import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import RoleColor from '../RoleColor';

const enhance = pure;

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

export default enhance(Username);
