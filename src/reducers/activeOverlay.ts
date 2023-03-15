import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { StoreState } from '../redux/configureStore';

type OverlayName = 'about' | 'admin' | 'playlistManager' | 'roomHistory' | 'settings';
const initialState: {
  current: OverlayName | null,
} = {
  current: null,
};

const slice = createSlice({
  name: 'activeOverlay',
  initialState,
  reducers: {
    openOverlay(state, action: PayloadAction<OverlayName>) {
      state.current = action.payload;
    },
    toggleOverlay(state, action: PayloadAction<OverlayName>) {
      state.current = state.current === action.payload ? null : action.payload;
    },
    closeOverlay: (state) => {
      state.current = null;
    },
  },
});

export const {
  openOverlay,
  toggleOverlay,
  closeOverlay,
} = slice.actions;

export const selectOverlay = (state: StoreState) => state.activeOverlay.current;

export default slice.reducer;
