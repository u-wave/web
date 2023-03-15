import cx from 'clsx';

type AvatarProps = {
  className?: string,
  user: {
    _id: string,
    avatar?: string,
    username: string,
  },
};

function Avatar({ className, user }: AvatarProps) {
  return (
    <div className={cx('Avatar', className)}>
      <img
        className="Avatar-image"
        src={user.avatar ?? `https://sigil.u-wave.net/${encodeURIComponent(user._id)}`}
        alt={user.username}
      />
    </div>
  );
}

export default Avatar;
