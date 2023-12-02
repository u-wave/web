import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { StoreState } from '../redux/configureStore';
import type { NewPlaylistItem } from './playlists';

interface ClosedState {
  type: null,
  data: null,
}
interface AddState {
  type: 'add',
  data: {
    media: NewPlaylistItem[],
  },
}
interface FavoriteState {
  type: 'favorite',
  data: { historyID: string },
}

type State = {
  open: boolean,
  position: { x: number, y: number },
} & (ClosedState | AddState | FavoriteState);

const initialState: State = {
  open: false,
  position: { x: 0, y: 0 },
  type: null,
  data: null,
} as State;

const slice = createSlice({
  name: 'addToPlaylistMenu',
  initialState,
  reducers: {
    open(state, action: PayloadAction<{
      position: { x: number, y: number },
    } & (AddState | FavoriteState)>) {
      state.open = true;
      Object.assign(state, action.payload);
    },
    close() {
      return initialState;
    },
  },
});

export const {
  open,
  close,
} = slice.actions;
export function openFavoriteMenu(historyID: string, position: { x: number, y: number }) {
  return open({
    type: 'favorite',
    position,
    data: { historyID },
  });
}

export function isOpenSelector(state: StoreState) {
  return state.addToPlaylistMenu.open;
}

export function positionSelector(state: StoreState) {
  return state.addToPlaylistMenu.position;
}

export function isFavoriteSelector(state: StoreState) {
  return state.addToPlaylistMenu.type === 'favorite';
}

export function mediaSelector(state: StoreState) {
  const { open: isOpen, type, data } = state.addToPlaylistMenu;
  return isOpen && type === 'add' ? data.media : null;
}

export function historyIDSelector(state: StoreState) {
  const { open: isOpen, type, data } = state.addToPlaylistMenu;
  return isOpen && type === 'favorite' ? data.historyID : null;
}

export default slice.reducer;
