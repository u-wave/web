import React from 'react';
import { useStore } from 'react-redux';
import { useClock as useClockCallbacks } from '../context/ClockContext';
import { currentTimeSelector } from '../selectors/timeSelectors';

const {
  useEffect,
  useReducer,
} = React;

export default function useClock() {
  const timerCallbacks = useClockCallbacks();
  const [, rerender] = useReducer((i) => i + 1, 0);

  // Avoid useSelector's memoization since this selector relies
  // on Date.now() under the hood.
  const store = useStore();
  const currentTime = currentTimeSelector(store.getState());

  function tick() {
    rerender({});
  }

  useEffect(() => {
    timerCallbacks.add(tick);
    return () => timerCallbacks.remove(tick);
  }, [timerCallbacks]);

  return currentTime;
}
