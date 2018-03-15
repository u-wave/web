import {
  SHOW_IMPORT_PANEL,
} from '../constants/actionTypes/imports';
import {
  SELECT_PLAYLIST,
} from '../constants/actionTypes/playlists';
import {
  SET_SEARCH_SOURCE,
  SHOW_SEARCH_RESULTS,
  SEARCH_START,
  SEARCH_COMPLETE,
  SEARCH_DELETE,
} from '../constants/actionTypes/search';
import { IDLE, LOADING, LOADED } from '../constants/LoadingStates';

const initialState = {
  sourceType: 'youtube',
  query: null,
  showResults: false,
  results: {},
  loadingState: IDLE,
};

export default function reduce(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SHOW_SEARCH_RESULTS:
      return {
        ...state,
        showResults: true,
      };
    case SEARCH_START:
      return {
        ...state,
        query: payload.query,
        results: {},
        loadingState: LOADING,
      };
    case SEARCH_COMPLETE:
      return {
        ...state,
        results: payload.results,
        loadingState: LOADED,
      };
    case SET_SEARCH_SOURCE:
      return {
        ...state,
        sourceType: payload.source,
      };
    case SEARCH_DELETE:
      return {
        ...state,
        query: null,
        loadingState: IDLE,
        results: {},
        showResults: false,
      };
    case SELECT_PLAYLIST:
    case SHOW_IMPORT_PANEL:
      return {
        ...state,
        showResults: false,
      };
    default:
      return state;
  }
}
