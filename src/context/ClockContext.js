import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createTimer, stopTimer } from '../actions/TickerActionCreators';

const {
  useCallback,
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

  const addCallback = useCallback((onTick) => {
    setCallbacks((list) => [...list, onTick]);
  }, []);
  const removeCallback = useCallback((onTick) => {
    setCallbacks((list) => list.filter((entry) => entry !== onTick));
  }, []);

  const timerCallbacks = useMemo(() => ({
    add: addCallback,
    remove: removeCallback,
  }), [addCallback, removeCallback]);

  // Make sure the callbacks are up to date for the createTimer() tick function.
  // This way we don't have to re-configure the timer every time, so it can keep
  // ticking consistently.
  callbacksRef.current = callbacks;
  useEffect(() => {
    // Start the clock! üWave stores the current time in the application state
    // primarily to make sure that different timers in the UI update simultaneously.
    dispatch(createTimer(() => {
      callbacksRef.current.forEach((cb) => cb());
    }));
    return () => dispatch(stopTimer);
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

export default {
  Consumer: ClockContext.Consumer,
  Provider: ClockProvider,
};
export function useClock() {
  return useContext(ClockContext);
}
