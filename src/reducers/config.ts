import type { AnyAction } from 'redux';
import { createSelector } from '@reduxjs/toolkit';
import defaultEmoji from 'virtual:emoji-shortcodes';
import type { StoreState } from '../redux/configureStore';
import { initState } from './auth';

export interface State {
  roles: undefined | Record<string, string[]>;
  apiUrl?: string,
  socketUrl?: string,
  emoji: Record<string, string>,
  recaptcha?: { key: string | null },
}

export const initialState: State = {
  roles: undefined,
  emoji: {},
};

export default function reduce(state = initialState, action: AnyAction): State {
  const { type, payload } = action;
  switch (type) {
    case initState.fulfilled.type:
      if (payload.roles) {
        return {
          ...state,
          roles: payload.roles,
        };
      }
      return state;
    default:
      return state;
  }
}

function configSelector(state: StoreState) {
  return state.config;
}

export const requestOptionsSelector = createSelector(
  [configSelector],
  (config) => {
    const options = {};
    if (config.apiUrl) {
      options.apiUrl = config.apiUrl;
    }
    return options;
  },
);

export const availableEmojiImagesSelector = createSelector(
  [configSelector],
  (config) => ({ ...defaultEmoji, ...config.emoji }),
);

export const availableEmojiNamesSelector = createSelector(
  [availableEmojiImagesSelector],
  (emoji) => new Set(Object.keys(emoji)),
);

// This is slightly hacky: custom emoji will be hosted on
// a different URL so we have to mark them.
// Note server emotes do not need to be added here as they
// use full URLs.
// TODO(goto-bus-stop) I think builtins and custom emoji
// should be separated entirely so that we can interpret
// unicode emoji as builtin ones.
export const customEmojiNamesSelector = createSelector(
  configSelector,
  (config) => new Set(Object.keys(config.emoji ?? {})),
);

export function reCaptchaSiteKeySelector(state: StoreState) {
  return configSelector(state).recaptcha?.key;
}

const EMPTY_ROLES = {};
export function rolesSelector(state: StoreState) {
  return state.config.roles ?? EMPTY_ROLES;
}

// TODO make this configurable.
const DEFAULT_ROLE_COLORS = {
  admin: '#ff3b74',
  manager: '#05daa5',
  moderator: '#00b3dc',
  special: '#fc911d',
  default: '',
};
export function roleColorsSelector() {
  return DEFAULT_ROLE_COLORS;
}
