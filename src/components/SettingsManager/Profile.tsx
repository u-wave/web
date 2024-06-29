import cx from 'clsx';
import useIntl from '../../hooks/useIntl';
import Avatar from '../Avatar';
import UserRoles from '../UserCard/UserRoles';
import ChangeUsernameButton from './ChangeUsernameButton';
import type { User } from '../../reducers/users';

type ProfileProps = {
  className?: string,
  user: User,
  onChangeUsername: (name: string) => undefined | Promise<void>,
};
function Profile({ className, user, onChangeUsername }: ProfileProps) {
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

export default Profile;
