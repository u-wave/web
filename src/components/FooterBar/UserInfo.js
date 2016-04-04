import cx from 'classnames';
import React from 'react';
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings';
import muiThemeable from 'material-ui/lib/muiThemeable';

import Avatar from '../Avatar';

const UserInfo = ({ className, user, muiTheme, ...attrs }) => {
  return (
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
          color={muiTheme.rawTheme.palette.textColor}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </div>
  );
};

export default muiThemeable(UserInfo);
