import cx from 'classnames';
import React, { PropTypes } from 'react';
import pure from 'recompose/pure';
import themeable from 'material-ui/lib/muiThemeable';

// TODO define role names server-side instead of role numbers
const tempRoleIDToRoleName = {
  0: 'default',
  1: 'special',
  2: 'moderator',
  3: 'manager',
  4: 'admin'
};

const Username = ({ className, muiTheme, user }) => {
  const { rankColors } = muiTheme.rawTheme;
  const roleName = tempRoleIDToRoleName[Math.min(user.role, 4)];
  let styles;
  if (rankColors[roleName]) {
    styles = { color: rankColors[roleName] };
  }
  return (
    <span
      className={cx('Username', `Username--${roleName}`, className)}
      style={styles}
    >
      {user.username}
    </span>
  );
};

Username.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired
};

// NB themeable signature will change in material-ui v0.15
export default themeable(pure(Username));
