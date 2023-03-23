import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { dset } from 'dset';
import deepmerge from 'deepmerge';

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
    apply(state, { payload }: PayloadAction<Partial<State>>) {
      deepmerge(state, payload);
    },
  },
});

export const {
  load,
  apply,
} = slice.actions;
export function setLanguage(language: string) {
  return slice.actions.apply({ language });
}
// This is quite type-unsafe…
export function set(key: string, value: unknown) {
  const changeset = {};
  dset(changeset, key, value);
  return slice.actions.apply(changeset);
}

export default slice.reducer;
