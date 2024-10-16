import useSWR from 'swr';
import { useMemo } from 'react';
import { useSelector } from './useRedux';
import mergeIncludedModels from '../utils/mergeIncludedModels';
import { type Media, currentPlaySelector } from '../reducers/booth';
import { type User } from '../reducers/users';
import uwFetch, { type ListResponse } from '../utils/fetch';

interface ApiMedia {
  _id: string
  sourceID: string
  sourceType: string
  sourceData: Record<string, unknown> | null
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
    sourceData: Record<string, unknown> | null,
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

function useRoomHistory() {
  const { data } = useSWR('/booth/history', uwFetch<ListResponse<ApiHistoryEntry>>, {
    suspense: true,
  });

  const currentPlay = useSelector(currentPlaySelector);
  const historyEntries = useMemo(() => {
    return data ? mergeIncludedModels(data).map(normalizeFromApi) : [];
  }, [data]);

  const media = useMemo(() => {
    if (currentPlay == null) {
      return historyEntries;
    }
    // Use up-to-date state for the current play.
    if (historyEntries[0] != null && historyEntries[0]._id === currentPlay._id) {
      return [currentPlay, ...historyEntries.slice(1)];
    }
    return [currentPlay, ...historyEntries];
  }, [currentPlay, historyEntries]);

  return media;
}

export default useRoomHistory;
