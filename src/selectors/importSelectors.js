import { createSelector } from 'reselect';

/** @param {import('../redux/configureStore').StoreState} state */
const baseSelector = (state) => state.imports;

export const selectedSourceTypeSelector = createSelector(
  baseSelector,
  (imports) => imports.sourceType,
);

export const showImportPanelSelector = createSelector(
  baseSelector,
  (imports) => imports.showPanel,
);
