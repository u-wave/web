import { SELECT_PANEL } from '../constants/ActionTypes';

// eslint-disable-next-line import/prefer-default-export
export function selectPanel(name) {
  return {
    type: SELECT_PANEL,
    payload: {
      panel: name,
    },
  };
}
