import { createSelector } from 'reselect';

const byTimestamp = (a, b) => a.timestamp < b.timestamp ? 1 : -1;

const baseSelector = state => state.roomHistory;

export const roomHistorySelector = createSelector(
  baseSelector,
  history => history.slice().sort(byTimestamp)
);
