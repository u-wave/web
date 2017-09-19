import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import ChangeUsernameButton from './ChangeUsernameButton';

const tempRoleIDToReadableName = [
  'User',
  'Special',
  'Moderator',
  'Manager',
  'Admin'
];

const formatJoinDate = date => new Date(date).toLocaleString([], {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
});

// MuiTheme needs still to be implemented for SettingsPanel Profiles
// const tempRoleIDToRoleName = {
//   0: 'default',
//   1: 'special',
//   2: 'moderator',
//   3: 'manager',
//   4: 'admin'
// };

const Profile = ({ className, user, onChangeUsername }) => (
  <div className={cx('SettingsPanelProfile', className)}>
    <Avatar
      className="SettingsPanelProfile-avatar"
      user={user}
    />
    <div className="SettingsPanelProfile-textblock">
      <h2 className="SettingsPanelProfile-username">
        {user.username}
        <ChangeUsernameButton
          onChangeUsername={onChangeUsername}
          initialUsername={user.username}
        />
      </h2>
      <a className="SettingsPanelProfile-role">
        {tempRoleIDToReadableName[user.role]}
      </a>
      <p className="SettingsPanelProfile-date">
        {formatJoinDate(user.createdAt)}
      </p>
    </div>
  </div>
);

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,

  onChangeUsername: PropTypes.func.isRequired
};

export default Profile;
