import type { InsertTarget, Playlist, PlaylistItem } from '../../../reducers/playlists';
import { type ContextType, useMediaListContext } from '../../MediaList/BaseMediaList';

export interface PlaylistContextProps extends ContextType<PlaylistItem> {
  playlist: Playlist;
  isFiltered: boolean;
  onMoveMedia: (items: PlaylistItem[], target: InsertTarget) => Promise<void>;
}

export const usePlaylistContext = useMediaListContext<PlaylistContextProps>;
