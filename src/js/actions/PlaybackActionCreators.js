import dispatcher from '../dispatcher';

export function setVolume(volume) {
  dispatcher.dispatch({
    type: 'setVolume',
    payload: {
      volume: volume
    }
  });
}

export function mute() {
  dispatcher.dispatch({ type: 'mute' });
}

export function unmute() {
  dispatcher.dispatch({ type: 'unmute' });
}
