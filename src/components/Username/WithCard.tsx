import { useCallback, useRef } from 'react';
import useUserCard from '../../hooks/useUserCard';
import UsernameBase from '.';
import type { User } from '../../reducers/users';

type UsernameWithCardProps = {
  user: User,
};
function UsernameWithCard({ user }: UsernameWithCardProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { card, open: openCard } = useUserCard(user, buttonRef);
  const onUsernameClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    openCard();
  }, [openCard]);

  return (
    <>
      {card}
      <button
        type="button"
        onClick={onUsernameClick}
        ref={buttonRef}
      >
        <UsernameBase user={user} />
      </button>
    </>
  );
}

export default UsernameWithCard;
