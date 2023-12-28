import {
  type PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { createStructuredSelector } from 'reselect';
import { type User, userSelector, currentUserSelector } from './users';
import { currentTimeSelector } from './time';
import { initState } from './auth';
import uwFetch from '../utils/fetch';
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
  stats: { upvotes: string[], downvotes: string[], favorites: string[] },
}

interface EmptyState {
  historyID: null,
  djID: null,
  media: null,
  startTime: null,
  stats: null,
}

type State = (PlayingState | EmptyState) & {
  isFullscreen: boolean,
}

const initialState = {
  historyID: null,
  media: null,
  djID: null,
  startTime: null,
  stats: null,
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

export const upvote = createAsyncThunk('booth/upvote', async ({ historyID }: { historyID: string }) => {
  await uwFetch([`/booth/${historyID}/vote`, { method: 'put', data: { direction: 1 } }]);
});

export const downvote = createAsyncThunk('booth/downvote', async ({ historyID }: { historyID: string }) => {
  await uwFetch([`/booth/${historyID}/vote`, { method: 'put', data: { direction: -1 } }]);
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
            stats: {
              upvotes: [],
              downvotes: [],
              favorites: [],
            },
          };
        }
        return {
          ...state,
          historyID: null,
          media: null,
          djID: null,
          startTime: null,
          stats: null,
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

    receiveUpvote(state, action: PayloadAction<{ userID: string }>) {
      if (state.stats == null) {
        return;
      }

      const { userID } = action.payload;
      const downvotes = new Set(state.stats.downvotes);
      if (downvotes.delete(userID)) {
        state.stats.downvotes = Array.from(downvotes);
      }
      const { upvotes } = state.stats;
      if (!upvotes.includes(userID)) {
        upvotes.push(userID);
      }
    },
    receiveDownvote(state, action: PayloadAction<{ userID: string }>) {
      if (state.stats == null) {
        return;
      }

      const { userID } = action.payload;
      const upvotes = new Set(state.stats.upvotes);
      if (upvotes.delete(userID)) {
        state.stats.upvotes = Array.from(upvotes);
      }
      const { downvotes } = state.stats;
      if (!downvotes.includes(userID)) {
        downvotes.push(userID);
      }
    },
    receiveFavorite(state, action: PayloadAction<{ userID: string }>) {
      if (state.stats == null) {
        return;
      }

      const { userID } = action.payload;
      const { favorites } = state.stats;
      if (!favorites.includes(userID)) {
        favorites.push(userID);
      }
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
          stats: payload.booth.stats,
        });
      } else {
        Object.assign(state, {
          historyID: null,
          media: null,
          djID: null,
          startTime: null,
          stats: null,
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
  receiveUpvote,
  receiveDownvote,
  receiveFavorite,
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

function createIsSelector(votersSelector: (state: StoreState) => string[] | undefined) {
  return (state: StoreState) => {
    const voters = votersSelector(state);
    const user = currentUserSelector(state);
    return user != null && voters != null && voters.includes(user._id);
  };
}

function createCountSelector(votersSelector: (state: StoreState) => string[] | undefined) {
  return (state: StoreState) => {
    const voters = votersSelector(state);
    return voters ? voters.length : 0;
  };
}

export function favoritesSelector(state: StoreState) {
  return state.booth.stats?.favorites;
}
export function upvotesSelector(state: StoreState) {
  return state.booth.stats?.upvotes;
}
export function downvotesSelector(state: StoreState) {
  return state.booth.stats?.downvotes;
}

export const isFavoriteSelector = createIsSelector(favoritesSelector);
export const isUpvoteSelector = createIsSelector(upvotesSelector);
export const isDownvoteSelector = createIsSelector(downvotesSelector);

export const favoritesCountSelector = createCountSelector(favoritesSelector);
export const upvotesCountSelector = createCountSelector(upvotesSelector);
export const downvotesCountSelector = createCountSelector(downvotesSelector);

export const currentVotesSelector = createStructuredSelector({
  favorites: favoritesSelector,
  upvotes: upvotesSelector,
  downvotes: downvotesSelector,
});

export const currentVoteStatsSelector = createStructuredSelector({
  isFavorite: isFavoriteSelector,
  isUpvote: isUpvoteSelector,
  isDownvote: isDownvoteSelector,
  favoritesCount: favoritesCountSelector,
  upvotesCount: upvotesCountSelector,
  downvotesCount: downvotesCountSelector,
});

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
