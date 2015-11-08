import { dispatch } from '../dispatcher';

export function selectPanel(name) {
  dispatch({
    type: 'selectPanel',
    payload: {
      panel: name
    }
  });
}
