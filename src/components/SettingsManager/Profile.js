import muiThemeable from 'material-ui/styles/muiThemeable';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import ChangeUsernameButton from './ChangeUsernameButton';

const enhance = muiThemeable();

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


const tempRoleIDToRoleName = {
  0: 'default',
  1: 'special',
  2: 'moderator',
  3: 'manager',
  4: 'admin'
};


const Profile = ({
  className, user, onChangeUsername, muiTheme
}) => (
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
      <p style={{ color: muiTheme.rankColors[tempRoleIDToRoleName[user.role]] }} className="SettingsPanelProfile-role">
        {tempRoleIDToReadableName[user.role]}
      </p>
      <p className="SettingsPanelProfile-date">
        {formatJoinDate(user.createdAt)}
      </p>
    </div>
  </div>
);

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,

  onChangeUsername: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired
};

export default enhance(Profile);
