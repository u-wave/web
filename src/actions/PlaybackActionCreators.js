import { set } from './SettingsActionCreators';
import { settingsSelector } from '../selectors/settingSelectors';
import {
  ENTER_FULLSCREEN,
  EXIT_FULLSCREEN,
} from '../constants/ActionTypes';

export function setVolume(volume) {
  return set('volume', volume);
}

export function mute() {
  return set('muted', true);
}

export function unmute() {
  return set('muted', false);
}

export function setVideoSize(size) {
  return set('videoSize', size);
}

const nextVideoSize = {
  large: 'small',
  small: 'large',
};
export function toggleVideoSize() {
  return (dispatch, getState) => {
    const current = settingsSelector(getState()).videoSize;
    const other = nextVideoSize[current];
    dispatch(setVideoSize(other));
  };
}

export function enterFullscreen() {
  return { type: ENTER_FULLSCREEN };
}

export function exitFullscreen() {
  return { type: EXIT_FULLSCREEN };
}
