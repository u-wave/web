import type { AnyAction } from 'redux';
import { ADVANCE, LOAD_HISTORY_COMPLETE } from '../constants/ActionTypes';
import type { currentPlaySelector } from '../selectors/roomHistorySelectors';
import type { Media } from './booth';
import type { User } from './users';

type BoothHistoryEntry = NonNullable<ReturnType<typeof currentPlaySelector>>;

interface ApiMedia {
  _id: string
  sourceID: string
  sourceType: string
  sourceData: object
  artist: string
  title: string
  duration: number
  thumbnail: string
  createdAt: string
  updatedAt: string
}

interface ApiHistoryEntry {
  _id: string,
  user: User,
  playlist: string,
  item: string,
  media: {
    media: ApiMedia,
    artist: string,
    title: string,
    start: number,
    end: number,
    sourceData: object,
  },
  playedAt: string,
  upvotes: string[],
  downvotes: string[],
  favorites: string[],
}

export interface HistoryEntry {
  _id: string;
  user: User,
  media: Media,
  timestamp: number,
  stats: {
    upvotes: string[],
    downvotes: string[],
    favorites: string[],
  },
}

const initialState: HistoryEntry[] = [];

export function normalizeFromApi(entry: ApiHistoryEntry) {
  return {
    _id: entry._id,
    user: entry.user,
    media: {
      ...entry.media.media,
      ...entry.media,
    },
    timestamp: new Date(entry.playedAt).getTime(),
    stats: {
      upvotes: entry.upvotes ?? [],
      downvotes: entry.downvotes ?? [],
      favorites: entry.favorites ?? [],
    },
  };
}

const normalizeFromBooth = (entry: BoothHistoryEntry) => ({
  _id: entry._id,
  user: entry.user!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
  media: entry.media!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
  timestamp: new Date(entry.timestamp).getTime(),
  stats: entry.stats,
});

export default function reduce(state = initialState, action: AnyAction): HistoryEntry[] {
  const { type, payload, meta } = action;
  switch (type) {
    case LOAD_HISTORY_COMPLETE:
      return (payload as ApiHistoryEntry[]).map(normalizeFromApi);
    case ADVANCE: {
      const mostRecent = state[0];
      // If the currently playing track is already in the history, remove it--
      // it'll be added back on the next advance, and will be handled by the
      // roomHistorySelector in the mean time.
      if (mostRecent && payload && mostRecent._id === payload.historyID) {
        return state.slice(1);
      }
      if (!meta || !meta.previous) {
        return state;
      }
      return [normalizeFromBooth(meta.previous), ...state];
    }
    default:
      return state;
  }
}
