import type { AnyAction } from 'redux';
import {
  SHOW_IMPORT_SOURCE_PANEL,
  HIDE_IMPORT_SOURCE_PANEL,
} from '../constants/ActionTypes';

interface State {
  sourceType: string | null;
}

const initialState: State = {
  sourceType: null,
};

export default function reduce(state = initialState, action: AnyAction): State {
  const { type, payload } = action;
  switch (type) {
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
