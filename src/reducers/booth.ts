import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { User } from './users';
import { initState } from './auth';

export interface Media {
  _id: string,
  sourceType: string,
  sourceID: string,
  sourceData: object,
  artist: string,
  title: string,
  thumbnail: string,
  duration: number,
  start: number,
  end: number,
}

interface PlayingState {
  historyID: string,
  djID: string,
  media: Media,
  startTime: number,
}

interface EmptyState {
  historyID: null,
  djID: null,
  media: null,
  startTime: null,
}

type State = (PlayingState | EmptyState) & {
  isFullscreen: boolean,
}

const initialState = {
  historyID: null,
  media: null,
  djID: null,
  startTime: null,
  isFullscreen: false,
} as State;

type AdvancePayload = { historyID: string, media: Media, userID: string, timestamp: number };
type PreviousBooth = {
  _id: string,
  user: User,
  media: Media,
  timestamp: number,
  stats: { upvotes: string[], downvotes: string[], favorites: string[] },
};

const slice = createSlice({
  name: 'booth',
  initialState,
  reducers: {
    advance: {
      reducer(
        state,
        action: PayloadAction<AdvancePayload | null>,
      ): State {
        if (action.payload) {
          return {
            ...state,
            historyID: action.payload.historyID,
            media: action.payload.media,
            djID: action.payload.userID,
            startTime: action.payload.timestamp,
          };
        }
        return {
          ...state,
          historyID: null,
          media: null,
          djID: null,
          startTime: null,
        };
      },
      prepare(payload: AdvancePayload | null, previous: PreviousBooth | null = null) {
        return { payload, meta: { previous } };
      },
    },
    enterFullscreen(state) {
      state.isFullscreen = true;
    },
    exitFullscreen(state) {
      state.isFullscreen = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(initState.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload.booth) {
        Object.assign(state, {
          historyID: payload.booth.historyID,
          media: {
            ...payload.booth.media,
            ...payload.booth.media.media,
          },
          djID: payload.booth.userID,
          // Depending on the server version, `playedAt` may be a string or a number
          // This is what we call "not ideal"…
          startTime: new Date(payload.booth.playedAt).getTime(),
        });
      } else {
        Object.assign(state, {
          historyID: null,
          media: null,
          djID: null,
          startTime: null,
        });
      }
    });
  },
});

export const {
  advance,
  enterFullscreen,
  exitFullscreen,
} = slice.actions;

export default slice.reducer;
