import { createSelector } from 'reselect';

const baseSelector = state => state.server;

// eslint-disable-next-line import/prefer-default-export
export const isConnectedSelector = createSelector(
  baseSelector,
  server => server.connected,
);
