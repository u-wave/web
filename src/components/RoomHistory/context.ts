import type { HistoryEntry } from '../../hooks/useRoomHistory';
import { type ContextType, useMediaListContext } from '../MediaList/BaseMediaList';

export const useRoomHistoryContext = useMediaListContext<ContextType<HistoryEntry>>;
