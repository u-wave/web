import { createSelector } from 'reselect';

const baseSelector = state => state.imports;

export const showImportPanelSelector = createSelector(
  baseSelector,
  imports => imports.showPanel
);
