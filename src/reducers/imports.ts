import type { AnyAction } from 'redux';
import {
  SHOW_IMPORT_SOURCE_PANEL,
  HIDE_IMPORT_SOURCE_PANEL,
} from '../constants/ActionTypes';
import type { StoreState } from '../redux/configureStore';

interface State {
  sourceType: string | null;
}

const initialState: State = {
  sourceType: null,
};

function reduce(state = initialState, action: AnyAction): State {
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

export function selectedSourceTypeSelector(state: StoreState) {
  return state.imports.sourceType;
}

export default reduce;
