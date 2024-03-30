import cx from 'clsx';
import { useEffect, useRef } from 'react';
import { useStore } from '../../hooks/useRedux';
import { currentTimeSelector } from '../../reducers/server';

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(val, max));
}

type ProgressProps = {
  className?: string,
  startTime: number,
  duration: number,
};

function Progress({ className, startTime, duration }: ProgressProps) {
  const animateRef = useRef<HTMLDivElement>(null);
  const store = useStore();

  useEffect(() => {
    let frame: ReturnType<typeof requestAnimationFrame>;
    function animate() {
      const currentTime = currentTimeSelector(store.getState());
      const width = Math.round(((currentTime - startTime) / duration) * 100) / 1000;
      if (animateRef.current != null) {
        animateRef.current.style.width = `${clamp(width, 0, 100)}%`;
      }
      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [store, startTime, duration]);

  return (
    <div className={cx('Progress', className)}>
      <div className="Progress-fill" ref={animateRef} />
    </div>
  );
}

export default Progress;
