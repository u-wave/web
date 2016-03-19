import { createSelector } from 'reselect';

const baseSelector = state => state.time;

const timeSelector = createSelector(baseSelector, time => time.time);
const offsetSelector = createSelector(baseSelector, time => time.offset);

export const currentTimeSelector = createSelector(
  timeSelector,
  offsetSelector,
  (time, offset) => time + offset
);
