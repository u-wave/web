import { set } from './SettingsActionCreators';

export function setVolume(volume) {
  set('volume', volume);
}

export function mute() {
  set('muted', true);
}

export function unmute() {
  set('muted', false);
}
