import React from 'react';
import { useSelector } from 'react-redux';
import { useClock as useClockCallbacks } from '../context/ClockContext';
import { currentTimeSelector } from '../selectors/timeSelectors';

const {
  useEffect,
  useState,
} = React;

export default function useClock() {
  const timerCallbacks = useClockCallbacks();
  const [, rerender] = useState(0);
  // Make sure the selector is seen as different each time.
  const currentTime = useSelector(s => currentTimeSelector(s));

  function tick() {
    rerender(i => i + 1);
  }

  useEffect(() => {
    timerCallbacks.add(tick);
    return () => timerCallbacks.remove(tick);
  }, []);

  return currentTime;
}
