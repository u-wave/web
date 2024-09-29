import cx from 'clsx';
import { useCallback, useRef } from 'react';
import useUserCard from '../../hooks/useUserCard';
import type { User } from '../../reducers/users';
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
  const rootRef = useRef<HTMLButtonElement>(null);
  const { card, open: openCard } = useUserCard(user, rootRef);
  const onOpenCard = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    openCard();
  }, [openCard]);

  return (
    <>
      {card}
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
        ref={rootRef}
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
