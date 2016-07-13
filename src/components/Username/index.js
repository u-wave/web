import cx from 'classnames';
import * as React from 'react';
import pure from 'recompose/pure';
import muiThemeable from 'material-ui/styles/muiThemeable';

// TODO define role names server-side instead of role numbers
const tempRoleIDToRoleName = {
  0: 'default',
  1: 'special',
  2: 'moderator',
  3: 'manager',
  4: 'admin'
};

const Username = ({ className, muiTheme, user }) => {
  const rankColors = muiTheme.rankColors;
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
  className: React.PropTypes.string,
  user: React.PropTypes.object.isRequired,
  muiTheme: React.PropTypes.object.isRequired
};

export default muiThemeable()(pure(Username));
