/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import baseSelector from './baseSelector';

export const configSchemaSelector = createSelector(
  baseSelector,
  base => base.config.schema,
);
