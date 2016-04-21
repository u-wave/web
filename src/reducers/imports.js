import {
  SHOW_IMPORT_PANEL,
  SHOW_IMPORT_SOURCE_PANEL,
  HIDE_IMPORT_SOURCE_PANEL
} from '../constants/actionTypes/imports';
import {
  SELECT_PLAYLIST
} from '../constants/actionTypes/playlists';

import * as sources from '../sources';

const initialState = {
  showPanel: false,
  sourceType: null
};

function reduceSources(state, action) {
  return Object.keys(sources).reduce((newState, sourceName) => {
    const source = sources[sourceName];
    if (!source.reducer) {
      return newState;
    }
    return {
      ...newState,
      [sourceName]: source.reducer(newState[sourceName], action)
    };
  }, state);
}

function reduceImport(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
  case SHOW_IMPORT_PANEL:
    return {
      ...state,
      showPanel: true
    };
  case SELECT_PLAYLIST:
    return {
      ...state,
      showPanel: false
    };
  case SHOW_IMPORT_SOURCE_PANEL:
    return {
      ...state,
      sourceType: payload.sourceType
    };
  case HIDE_IMPORT_SOURCE_PANEL:
    return {
      ...state,
      sourceType: null
    };
  default:
    return state;
  }
}

export default function reduce(state, action) {
  return reduceSources(reduceImport(state, action), action);
}
