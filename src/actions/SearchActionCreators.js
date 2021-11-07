import { SHOW_SEARCH_RESULTS, HIDE_SEARCH_RESULTS } from '../constants/ActionTypes';

export function showSearchResults() {
  return { type: SHOW_SEARCH_RESULTS };
}

export function hideSearchResults() {
  return { type: HIDE_SEARCH_RESULTS };
}
