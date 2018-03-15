import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import find from 'array-find';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import muiThemeable from 'material-ui/styles/muiThemeable';

function getUserColor(rankColors, user) {
  const roleName = find(user.roles, name => rankColors[name]) || 'default';
  return rankColors[roleName];
}

const Username = ({
  muiTheme,
  className,
  user,
}) => (
  <span
    className={cx('Username', className)}
    style={{ color: getUserColor(muiTheme.rankColors, user) }}
  >
    {user.username}
  </span>
);

Username.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default compose(
  muiThemeable(),
  pure,
)(Username);
