import dispatcher from '../dispatcher';

export function selectPanel(name) {
  dispatcher.dispatch({
    type: 'selectPanel',
    payload: {
      panel: name
    }
  });
}
