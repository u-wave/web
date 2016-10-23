import { set } from './SettingsActionCreators';
import {
  ENTER_FULLSCREEN,
  EXIT_FULLSCREEN
} from '../constants/actionTypes/booth';

export function setVolume(volume) {
  return set('volume', volume);
}

export function mute() {
  return set('muted', true);
}

export function unmute() {
  return set('muted', false);
}

export function enterFullscreen() {
  return { type: ENTER_FULLSCREEN };
}

export function exitFullscreen() {
  return { type: EXIT_FULLSCREEN };
}
