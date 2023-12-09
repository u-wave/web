/* eslint-disable import/prefer-default-export */
import { type ContextType, useMediaListContext } from '../MediaList/BaseMediaList';
import type { HistoryEntry } from '../../hooks/useRoomHistory';

export const useRoomHistoryContext = useMediaListContext<ContextType<HistoryEntry>>;
