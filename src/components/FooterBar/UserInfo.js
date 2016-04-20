import cx from 'classnames';
import * as React from 'react';
import pure from 'recompose/pure';
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings';

import Avatar from '../Avatar';

const fullSizeStyle = {
  width: '100%',
  height: '100%'
};

const UserInfo = ({ className, user, ...attrs }) => (
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
        color="#fff"
        style={fullSizeStyle}
      />
    </div>
  </div>
);

UserInfo.propTypes = {
  className: React.PropTypes.string,
  user: React.PropTypes.object.isRequired
};

export default pure(UserInfo);
