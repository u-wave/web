import { useEffect, useReducer } from 'react';
import { useClock as useClockCallbacks } from '../context/ClockContext';
import { currentTimeSelector } from '../reducers/server';
import { useStore } from './useRedux';

export default function useClock() {
  const timerCallbacks = useClockCallbacks();
  if (timerCallbacks == null) {
    throw new Error('useClock: clock context not found');
  }

  const [, rerender] = useReducer((s: number) => s + 1, 0);

  // Avoid useSelector's memoization since this selector relies
  // on Date.now() under the hood.
  const store = useStore();
  const currentTime = currentTimeSelector(store.getState());

  useEffect(() => {
    timerCallbacks.add(rerender);
    return () => timerCallbacks.remove(rerender);
  }, [timerCallbacks]);

  return currentTime;
}
