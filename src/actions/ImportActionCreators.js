import {
  SHOW_IMPORT_PANEL,
  HIDE_IMPORT_PANEL,
  SHOW_IMPORT_SOURCE_PANEL,
  HIDE_IMPORT_SOURCE_PANEL,
} from '../constants/actionTypes/imports';

export function showImportPanel() {
  return {
    type: SHOW_IMPORT_PANEL,
  };
}

export function hideImportPanel() {
  return {
    type: HIDE_IMPORT_PANEL,
  };
}

export function showImportSourcePanel(sourceType) {
  return {
    type: SHOW_IMPORT_SOURCE_PANEL,
    payload: { sourceType },
  };
}

export function hideImportSourcePanel() {
  return { type: HIDE_IMPORT_SOURCE_PANEL };
}
