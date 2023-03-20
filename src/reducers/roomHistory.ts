import type { Media } from './booth';
import type { User } from './users';

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
