import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import useIntl from '../../hooks/useIntl';
import Avatar from '../Avatar';
import UserRoles from '../UserCard/UserRoles';
import ChangeUsernameButton from './ChangeUsernameButton';

function Profile({ className, user, onChangeUsername }) {
  const { dateTimeFormatter } = useIntl();

  return (
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
        <UserRoles roles={user.roles} />
        <p className="SettingsPanelProfile-date">
          {dateTimeFormatter.format(new Date(user.createdAt))}
        </p>
      </div>
    </div>
  );
}

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
};

export default Profile;
