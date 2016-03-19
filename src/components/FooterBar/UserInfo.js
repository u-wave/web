import cx from 'classnames';
import * as React from 'react';
import pure from 'recompose/pure';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import muiThemeable from 'material-ui/styles/muiThemeable';

import Avatar from '../Avatar';

const fullSizeStyle = {
  width: '100%',
  height: '100%'
};

const UserInfo = ({ className, user, muiTheme, ...attrs }) => (
  <div
    className={cx('UserInfo', className)}
    {...attrs}
  >
    <Avatar
      className="UserInfo-avatar"
      user={user}
    />
    <div className="UserInfo-settings">
      <SettingsIcon
        color={muiTheme.palette.textColor}
        style={fullSizeStyle}
      />
    </div>
  </div>
);

UserInfo.propTypes = {
  className: React.PropTypes.string,
  muiTheme: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
};

export default muiThemeable()(pure(UserInfo));
