import cx from 'classnames';
import * as React from 'react';
import pure from 'recompose/pure';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import Avatar from '../Avatar';

const fullSizeStyle = {
  width: '100%',
  height: '100%'
};

const UserInfo = ({ className, user, onClick }) => (
  <button
    className={cx('UserInfo', className)}
    onClick={onClick}
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
  </button>
);

UserInfo.propTypes = {
  className: React.PropTypes.string,
  user: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
};

export default pure(UserInfo);
