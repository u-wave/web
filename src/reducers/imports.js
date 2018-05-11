import {
  SHOW_IMPORT_PANEL,
  SHOW_IMPORT_SOURCE_PANEL,
  HIDE_IMPORT_SOURCE_PANEL,
  SELECT_PLAYLIST,
  SHOW_SEARCH_RESULTS,
} from '../constants/ActionTypes';

const initialState = {
  showPanel: false,
  sourceType: null,
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SHOW_IMPORT_PANEL:
      return {
        ...state,
        showPanel: true,
      };
    case SELECT_PLAYLIST:
    case SHOW_SEARCH_RESULTS:
      return {
        ...state,
        showPanel: false,
      };
    case SHOW_IMPORT_SOURCE_PANEL:
      return {
        ...state,
        sourceType: payload.sourceType,
      };
    case HIDE_IMPORT_SOURCE_PANEL:
      return {
        ...state,
        sourceType: null,
      };
    default:
      return state;
  }
}
