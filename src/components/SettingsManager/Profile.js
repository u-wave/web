import cx from 'classnames';
import * as React from 'react';

import Avatar from '../Avatar';
import ChangeUsernameButton from './ChangeUsernameButton';

const Profile = ({ className, user, onChangeUsername }) => (
  <div className={cx('SettingsPanelProfile', className)}>
    <Avatar
      className="SettingsPanelProfile-avatar"
      user={user}
    />
    <h2 className="SettingsPanelProfile-username">
      {user.username}
      <ChangeUsernameButton
        onChangeUsername={onChangeUsername}
        initialUsername={user.username}
      />
    </h2>
  </div>
);

Profile.propTypes = {
  className: React.PropTypes.string,
  user: React.PropTypes.object.isRequired,

  onChangeUsername: React.PropTypes.func.isRequired
};

export default Profile;
