import cx from 'clsx';
import { memo } from 'react';
import { mdiCog } from '@mdi/js';
import Avatar from '../Avatar';
import SvgIcon from '../SvgIcon';
import type { User } from '../../reducers/users';

type UserInfoProps = {
  className?: string,
  user: User,
  onClick: () => void,
};
function UserInfo({ className, user, onClick }: UserInfoProps) {
  return (
    <button
      type="button"
      className={cx('UserInfo', className)}
      onClick={() => onClick()}
    >
      <Avatar
        className="UserInfo-avatar"
        user={user}
      />
      <div className="UserInfo-settings">
        <SvgIcon path={mdiCog} className="UserInfo-settingsIcon" />
      </div>
    </button>
  );
}

export default memo(UserInfo);
