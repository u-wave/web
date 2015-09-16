import dispatcher from '../dispatcher';

export function selectPanel(name) {
  dispatcher.dispatch({
    action: 'selectPanel',
    panel: name
  });
}
