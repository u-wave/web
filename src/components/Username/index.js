import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import find from 'array-find';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import muiThemeable from 'material-ui/styles/muiThemeable';

const Username = ({
  muiTheme,
  className,
  user
}) => {
  const rankColors = muiTheme.rankColors;
  const roleName = find(user.roles, name => rankColors[name]) || 'default';
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
