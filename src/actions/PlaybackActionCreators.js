import { ENTER_FULLSCREEN, EXIT_FULLSCREEN } from '../constants/ActionTypes';

export function enterFullscreen() {
  return { type: ENTER_FULLSCREEN };
}

export function exitFullscreen() {
  return { type: EXIT_FULLSCREEN };
}
