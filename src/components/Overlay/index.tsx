import cx from 'clsx';
import { useEffect, useState } from 'react';
import { usePresence } from 'motion/react';

type OverlayProps = {
  className?: string,
  children: React.ReactNode,
  direction?: 'top' | 'bottom',
};
function Overlay({ direction = 'bottom', children, className }: OverlayProps) {
  const [isPresent, safeToRemove] = usePresence();
  // `animState` mimicks the old react-transition-group style class names:
  // - Overlay-enter on mount (this is the hidden state)
  // - Overlay-enter + Overlay-enter-active post-mount (visible state)
  // - Overlay-exit before unmount (new hidden state)
  const [animState, setAnimState] = useState(() => isPresent ? 'Overlay-enter' : 'Overlay-exit');
  useEffect(() => {
    if (isPresent) {
      setAnimState('Overlay-enter Overlay-enter-active');
    } else {
      setAnimState('Overlay-exit');
    }
  }, [isPresent]);

  return (
    <div
      className={cx(
        'Overlay',
        `Overlay--from-${direction}`,
        animState,
      )}
      onTransitionEnd={isPresent ? undefined : safeToRemove}
    >
      <div className={cx('Overlay-body', className)}>
        {children}
      </div>
    </div>
  );
}

export default Overlay;
