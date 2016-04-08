import { createSelector } from 'reselect';

const baseSelector = state => state.time;

const timeSelector = () => Date.now();
const offsetSelector = createSelector(baseSelector, time => time.offset);

export const currentTimeSelector = createSelector(
  timeSelector,
  offsetSelector,
  (time, offset) => time + offset
);
