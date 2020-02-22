import React from 'react';
import UserCard from '../components/UserCard';

const {
  useCallback,
  useRef,
  useState,
} = React;

export default function useUserCard(user) {
  const [isOpen, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const refAnchor = useRef(null);

  const open = useCallback(() => {
    if (refAnchor.current) {
      const pos = refAnchor.current.getBoundingClientRect();
      setPosition({ x: pos.left, y: pos.top });
    }
    setOpen(true);
  });

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const card = isOpen && (
    <UserCard
      user={user}
      position={position}
      onClose={close}
    />
  );

  return {
    refAnchor,
    card,
    open,
    close,
  };
}
