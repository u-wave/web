import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from '../hooks/useRedux';
import { sync } from '../reducers/time';

const {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} = React;

const ClockContext = React.createContext(null);

function ClockProvider({ children }) {
  const [callbacks, setCallbacks] = useState([]);
  const callbacksRef = useRef(callbacks);
  const dispatch = useDispatch();

  const timerCallbacks = useMemo(() => ({
    add: (onTick) => {
      setCallbacks((list) => [...list, onTick]);
    },
    remove: (onTick) => {
      setCallbacks((list) => list.filter((entry) => entry !== onTick));
    },
  }), [setCallbacks]);

  // Make sure the callbacks are up to date for the setInterval() tick function.
  // This way we don't have to re-configure the timer every time, so it can keep
  // ticking consistently.
  callbacksRef.current = callbacks;
  useEffect(() => {
    // Start the clock! üWave stores the current time in the application state
    // primarily to make sure that different timers in the UI update simultaneously.
    let last = Date.now();
    let syncing = false;
    const interval = setInterval(() => {
      const now = Date.now();
      if (!syncing) {
        if (Math.abs(last - now) > 5_000) {
          syncing = true;
          dispatch(sync())
            .catch(() => {}) // Ignore errors
            .finally(() => {
              syncing = false;

              callbacksRef.current.forEach((cb) => cb());
            });
        } else {
          callbacksRef.current.forEach((cb) => cb());
        }
      }
      last = now;
    }, 1_000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <ClockContext.Provider value={timerCallbacks}>
      {children}
    </ClockContext.Provider>
  );
}

ClockProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

function useClock() {
  return useContext(ClockContext);
}

export { ClockProvider, useClock };
