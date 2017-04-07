import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
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
  className: PropTypes.string,
  user: PropTypes.object.isRequired,

  onChangeUsername: PropTypes.func.isRequired
};

export default Profile;
