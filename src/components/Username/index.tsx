import cx from 'clsx';
import RoleColor from '../RoleColor';

type UsernameProps = {
  className?: string,
  user: {
    roles: string[],
    username: string,
  },
};

function Username({ className, user }: UsernameProps) {
  return (
    <RoleColor className={cx('Username', className)} roles={user.roles}>
      {user.username}
    </RoleColor>
  );
}

export default Username;
