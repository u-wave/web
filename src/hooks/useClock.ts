import { useEffect, useState } from 'react';
import { useClock as useClockCallbacks } from '../context/ClockContext';
import { currentTimeSelector } from '../reducers/server';
import { useStore } from './useRedux';

export default function useClock() {
  const timerCallbacks = useClockCallbacks();
  if (timerCallbacks == null) {
    throw new Error('useClock: clock context not found');
  }

  const store = useStore();
  const [currentTime, setCurrentTime] = useState(() => currentTimeSelector(store.getState()));

  useEffect(() => {
    function rerender() {
      setCurrentTime(currentTimeSelector(store.getState()));
    }

    timerCallbacks.add(rerender);
    return () => timerCallbacks.remove(rerender);
  }, [timerCallbacks]);

  return currentTime;
}
