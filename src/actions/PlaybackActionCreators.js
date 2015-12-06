import { set } from './SettingsActionCreators';

export function setVolume(volume) {
  return set('volume', volume);
}

export function mute() {
  return set('muted', true);
}

export function unmute() {
  return set('muted', false);
}
