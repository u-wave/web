import { createSelector } from 'reselect';

const baseSelector = state => state.imports;

export const selectedSourceTypeSelector = createSelector(
  baseSelector,
  imports => imports.sourceType,
);

export const showImportPanelSelector = createSelector(
  baseSelector,
  imports => imports.showPanel,
);
