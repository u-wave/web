import cx from 'clsx';
import type { User } from '../../reducers/users';
import Avatar from '../Avatar';
import Username from '../Username';

type UserRowProps = {
  className?: string,
  user: User,
};
function UserRow({ className, user }: UserRowProps) {
  return (
    <div className={cx('UserRow', className)}>
      <Avatar
        className="UserRow-avatar"
        user={user}
      />
      <Username className="UserRow-username" user={user} />
    </div>
  );
}

export default UserRow;
