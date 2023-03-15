import { createSelector } from 'reselect';

/** @param {import('../redux/configureStore').StoreState} state */
const baseSelector = (state) => state.time;

const offsetSelector = createSelector(baseSelector, (time) => time.offset);
export const timerSelector = createSelector(baseSelector, (time) => time.timer);

// Do not use createSelector() to avoid memoization.
export const currentTimeSelector = (state) => {
  const time = Date.now();
  const offset = offsetSelector(state);
  return time + offset;
};
