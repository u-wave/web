import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { dset } from 'dset';
import deepmerge from 'deepmerge';
import type { StoreState } from '../redux/configureStore';
import { availableLanguages } from '../locales';
import { isPreviewMediaDialogOpenSelector } from './dialogs';

export interface NotificationSettings {
  userJoin: boolean;
  userLeave: boolean;
  userNameChanged: boolean;
  skip: boolean;
}

const initialState = {
  language: null as null | string,
  mentionSound: true,
  muted: false,
  videoEnabled: true,
  videoSize: 'large',
  volume: 0,
  notifications: {
    userJoin: true,
    userLeave: true,
    userNameChanged: true,
    skip: true,
  },
};

type State = typeof initialState

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    load(_state, { payload }: PayloadAction<Partial<State>>) {
      return deepmerge(initialState, payload);
    },
    applySettings(state, { payload }: PayloadAction<Partial<State>>) {
      return deepmerge(state, payload);
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    mute(state) {
      state.muted = true;
    },
    unmute(state) {
      state.muted = false;
    },
    setMentionSoundEnabled(state, action: PayloadAction<boolean>) {
      state.mentionSound = action.payload;
    },
    setVideoEnabled(state, action: PayloadAction<boolean>) {
      state.videoEnabled = action.payload;
    },
    setVideoSize(state, action: PayloadAction<'small' | 'large'>) {
      state.videoSize = action.payload;
    },
    toggleVideoSize(state) {
      state.videoSize = state.videoSize === 'large' ? 'small' : 'large';
    },
  },
});

export const {
  load,
  applySettings: apply,
  setLanguage,
  setVolume,
  mute,
  unmute,
  setMentionSoundEnabled,
  setVideoEnabled,
  setVideoSize,
  toggleVideoSize,
} = slice.actions;
// This is quite type-unsafe…
export function set(key: string, value: unknown) {
  const changeset = {};
  dset(changeset, key, value);
  return slice.actions.applySettings(changeset);
}

export function volumeSelector(state: StoreState) {
  return state.settings.volume;
}

export function isMutedSelector(state: StoreState) {
  return state.settings.muted;
}

function getDefaultLanguage() {
  if (typeof window === 'object' && window.navigator?.languages) {
    const browserLanguage = availableLanguages.find((lang) => {
      return window.navigator.languages.includes(lang);
    });
    if (browserLanguage) {
      return browserLanguage;
    }
  }
  return 'en';
}

let defaultLanguage: string | null = null;
export function languageSelector(state: StoreState) {
  if (state.settings.language) {
    return state.settings.language;
  }

  defaultLanguage ??= getDefaultLanguage();
  return defaultLanguage;
}

export function videoSizeSelector(state: StoreState) {
  return state.settings.videoSize;
}

export function videoEnabledSelector(state: StoreState) {
  return state.settings.videoEnabled;
}

export function mentionSoundEnabledSelector(state: StoreState) {
  return state.settings.mentionSound;
}

export function notificationSettingsSelector(state: StoreState) {
  return state.settings.notifications;
}

export function playbackMutedSelector(state: StoreState) {
  return isMutedSelector(state) || isPreviewMediaDialogOpenSelector(state);
}

export function playbackVolumeSelector(state: StoreState) {
  return playbackMutedSelector(state) ? 0 : volumeSelector(state);
}

export function mobilePlaybackVolumeSelector(state: StoreState) {
  return playbackMutedSelector(state) ? 0 : 100;
}

export default slice.reducer;
