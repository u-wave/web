import type { AnyAction } from 'redux';
import {
  HIDE_SEARCH_RESULTS,
  SELECT_PLAYLIST,
  SHOW_IMPORT_PANEL,
  SHOW_SEARCH_RESULTS,
} from '../constants/ActionTypes';

interface State {
  showResults: boolean;
}

const initialState: State = {
  showResults: false,
};

export default function reduce(state = initialState, action: AnyAction): State {
  const { type } = action;
  switch (type) {
    case SHOW_SEARCH_RESULTS:
      return { showResults: true };
    case SELECT_PLAYLIST:
    case SHOW_IMPORT_PANEL:
    case HIDE_SEARCH_RESULTS:
      return { showResults: false };
    default:
      return state;
  }
}
