import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
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

const Username = ({
  muiTheme,
  className,
  user
}) => {
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
  muiTheme: PropTypes.object.isRequired,
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default compose(
  muiThemeable(),
  pure
)(Username);
