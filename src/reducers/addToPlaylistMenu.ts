import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PlaylistItemDesc } from '../actions/PlaylistActionCreators';

interface ClosedState {
  type: null,
  data: null,
}
interface AddState {
  type: 'add',
  data: {
    media: PlaylistItemDesc[],
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
};

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

export default slice.reducer;
