import { createSelector } from 'reselect';
import baseSelector from './baseSelector';

export const configSelector = createSelector(
  baseSelector,
  base => base.config.values,
);

export const configSchemaSelector = createSelector(
  baseSelector,
  base => base.config.schema,
);
