import { dispatch } from '../dispatcher';

export function setVolume(volume) {
  dispatch({
    type: 'setVolume',
    payload: {
      volume: volume
    }
  });
}

export function mute() {
  dispatch({ type: 'mute' });
}

export function unmute() {
  dispatch({ type: 'unmute' });
}
