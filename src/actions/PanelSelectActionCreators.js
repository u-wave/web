import { SELECT_PANEL} from '../constants/actionTypes/panel';

export function selectPanel(name) {
  return {
    type: SELECT_PANEL,
    payload: {
      panel: name
    }
  };
}
