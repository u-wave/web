import dispatcher from '../dispatcher';

export function setVolume(volume) {
  dispatcher.dispatch({
    action: 'setVolume',
    volume: volume
  });
}

export function mute() {
  dispatcher.dispatch({ action: 'mute' });
}

export function unmute() {
  dispatcher.dispatch({ action: 'unmute' });
}
