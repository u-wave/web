import { useCallback, useState } from 'react';
import UserCard from '../components/UserCard';
import type { User } from '../reducers/users';

export default function useUserCard(user: User, refAnchor: React.RefObject<HTMLElement>) {
  const [isOpen, setOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number, y: number } | null>(null);

  const open = useCallback(() => {
    if (refAnchor.current) {
      const pos = refAnchor.current.getBoundingClientRect();
      setPosition({ x: pos.left, y: pos.top });
    }
    setOpen(true);
  }, [refAnchor]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const card = isOpen && position != null ? (
    <UserCard
      user={user}
      position={position}
      onClose={close}
    />
  ) : null;

  return {
    card,
    open,
    close,
  };
}
