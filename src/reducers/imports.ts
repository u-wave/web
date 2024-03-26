import type { AnyAction } from 'redux';
import type { StoreState } from '../redux/configureStore';

const SHOW_IMPORT_SOURCE_PANEL = 'imports/SHOW_SOURCE_PANEL';
const HIDE_IMPORT_SOURCE_PANEL = 'imports/HIDE_SOURCE_PANEL';

interface State {
  sourceType: string | null;
}

const initialState: State = {
  sourceType: null,
};

export function showImportSourcePanel(sourceType: string) {
  return {
    type: SHOW_IMPORT_SOURCE_PANEL,
    payload: { sourceType },
  };
}

export function hideImportSourcePanel() {
  return { type: HIDE_IMPORT_SOURCE_PANEL };
}

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
