import cx from 'clsx';
import { useCallback } from 'react';
import useUserCard from '../../hooks/useUserCard';
import { User } from '../../reducers/users';
import Avatar from '../Avatar';
import Username from '../Username';
import Position from './Position';

type SimpleRowProps = {
  className?: string,
  style?: React.CSSProperties,
  position: number,
  user: User,
};
function SimpleRow({
  className,
  style,
  position,
  user,
}: SimpleRowProps) {
  const userCard = useUserCard(user);
  const onOpenCard = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    userCard.open();
    // The `userCard.open` reference never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userCard.card}
      <button
        type="button"
        className={cx(
          'UserRow',
          'WaitlistRow',
          'UserRow--cardable',
          className,
        )}
        style={style}
        onClick={onOpenCard}
        ref={userCard.refAnchor}
      >
        <div>
          <Position position={position + 1} />
          <Avatar className="UserRow-avatar" user={user} />
          <Username className="UserRow-username" user={user} />
        </div>
      </button>
    </>
  );
}

export default SimpleRow;
