import {
  type PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { type User, userSelector, currentUserSelector } from './users';
import { currentTimeSelector } from './time';
import { initState } from './auth';
import uwFetch from '../utils/fetch';
import { currentVotesSelector } from './votes';
import type { StoreState } from '../redux/configureStore';

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

// This action doesn't need further handling because it will cause updates
// over WebSocket on the server.
export const skipSelf = createAsyncThunk('booth/skipSelf', async (
  options: { remove: boolean },
) => {
  await uwFetch(['/booth/skip', { method: 'post', data: options }]);
});

const slice = createSlice({
  name: 'booth',
  initialState,
  reducers: {
    // NOTE When modifying this action, also update votes.ts
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
            ...payload.booth.media.media,
            ...payload.booth.media,
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
  selectors: {
    historyID: (state) => state.historyID,
    media: (state) => state.media,
    startTime: (state) => state.startTime ?? 0,
  },
});

export const {
  advance,
  enterFullscreen,
  exitFullscreen,
} = slice.actions;
export const {
  historyID: historyIDSelector,
  media: mediaSelector,
  startTime: startTimeSelector,
} = slice.selectors;

export const mediaDurationSelector = (state: StoreState) => {
  const media = mediaSelector(state);
  return media ? media.end - media.start : 0;
};

export const endTimeSelector = (state: StoreState) => {
  const startTime = startTimeSelector(state);
  const duration = mediaDurationSelector(state);
  return startTime + (duration * 1000) || 0;
};

export const timeElapsedSelector = (state: StoreState) => {
  const startTime = startTimeSelector(state);
  const currentTime = currentTimeSelector(state);
  // in seconds! because media duration is in seconds, too.
  return startTime ? Math.max((currentTime - startTime) / 1000, 0) : 0;
};

export const timeRemainingSelector = (state: StoreState) => {
  const duration = mediaDurationSelector(state);
  const elapsed = timeElapsedSelector(state);
  return duration > 0 ? duration - elapsed : 0;
};

export const djSelector = (state: StoreState) => {
  const { booth } = state;
  if (booth.djID) {
    return userSelector(state, booth.djID);
  }
  return null;
};

export const isCurrentDJSelector = (state: StoreState) => {
  const dj = djSelector(state);
  const me = currentUserSelector(state);
  return dj && me ? dj._id === me._id : false;
};

export const currentPlaySelector = createSelector(
  [historyIDSelector, mediaSelector, startTimeSelector, djSelector, currentVotesSelector],
  (historyID, media, timestamp, dj, stats) => {
    if (!historyID || !media || !dj || !timestamp || !stats) {
      return null;
    }
    return {
      _id: historyID,
      user: dj,
      media,
      timestamp,
      stats,
    };
  },
);

export default slice.reducer;
