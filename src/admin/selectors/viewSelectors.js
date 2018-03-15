import { createSelector } from 'reselect';
import baseSelector from './baseSelector';

// eslint-disable-next-line import/prefer-default-export
export const currentViewSelector = createSelector(
  baseSelector,
  base => base.view,
);
