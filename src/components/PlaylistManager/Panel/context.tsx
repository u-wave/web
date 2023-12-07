import { useMediaListContext, type ContextType } from '../../MediaList/BaseMediaList';
import type { InsertTarget, Playlist, PlaylistItem } from '../../../reducers/playlists';

export interface PlaylistContextProps extends ContextType<PlaylistItem> {
  playlist: Playlist,
  isFiltered: boolean,
  onMoveMedia: (items: PlaylistItem[], target: InsertTarget) => Promise<void>,
}

export const usePlaylistContext = useMediaListContext<PlaylistContextProps>;
