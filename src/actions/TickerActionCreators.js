import compose from 'fj-compose';

export function tick() {
  return {
    type: 'tick',
    payload: 1
  };
}

export function startTicking() {
  return dispatch => setInterval(compose(dispatch, tick), 1000);
}
