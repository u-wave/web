import cx from 'clsx';
import CircularProgress from '@mui/material/CircularProgress';
import BaseMediaList, { useMediaListContext, type ContextType } from '../../MediaList/BaseMediaList';
import PlaylistMeta from './Meta';
import PlaylistEmpty from './PlaylistEmpty';
import PlaylistFilterEmpty from './PlaylistFilterEmpty';
import PlaylistItemRow from './PlaylistItemRow';
import DroppablePlaylistItemRow from './DroppablePlaylistItemRow';
import type { InsertTarget, Playlist, PlaylistItem } from '../../../reducers/playlists';

interface PlaylistContextProps extends ContextType<PlaylistItem> {
  playlist: Playlist,
  isFiltered: boolean,
  onMoveMedia: PlaylistPanelProps['onMoveMedia'],
}

export const usePlaylistContext = useMediaListContext<PlaylistContextProps>;

type PlaylistPanelProps = {
  className?: string,
  playlist: Playlist,
  media: (PlaylistItem | null)[],
  loading: boolean,
  isFiltered: boolean,
  onShufflePlaylist: () => Promise<void>,
  onActivatePlaylist: () => Promise<void>,
  onRenamePlaylist: (newName: string) => Promise<void>,
  onDeletePlaylist: (confirmName: string) => Promise<void>,
  onNotDeletable: () => Promise<void>,
  onLoadPlaylistPage: (page: number) => Promise<void>,
  onFilterPlaylistItems: (filter: string | null) => void,
  onMoveMedia: (items: PlaylistItem[], target: InsertTarget) => Promise<void>,
};
function PlaylistPanel(props: PlaylistPanelProps) {
  const {
    className,
    playlist,
    media,
    loading,
    isFiltered,
    onShufflePlaylist,
    onActivatePlaylist,
    onRenamePlaylist,
    onDeletePlaylist,
    onNotDeletable,
    onLoadPlaylistPage,
    onFilterPlaylistItems,
    onMoveMedia,
  } = props;

  const size = media.length;

  let list;
  if (loading) {
    list = (
      <div className="PlaylistPanel-loading">
        <CircularProgress size="100%" />
      </div>
    );
  } else if (isFiltered && media.length === 0) {
    list = <PlaylistFilterEmpty />;
  } else if (size === 0) {
    list = <PlaylistEmpty />;
  } else {
    list = (
      <BaseMediaList
        className="PlaylistPanel-media"
        size={size}
        media={media}
        listComponent="div"
        rowComponent={isFiltered ? PlaylistItemRow : DroppablePlaylistItemRow}
        contextProps={{ playlist, isFiltered, onMoveMedia }}
        onRequestPage={onLoadPlaylistPage}
      />
    );
  }

  return (
    <div className={cx('PlaylistPanel', className)}>
      <PlaylistMeta
        className="PlaylistPanel-meta"
        name={playlist.name}
        active={playlist.active ?? false}
        onShufflePlaylist={onShufflePlaylist}
        onActivatePlaylist={onActivatePlaylist}
        onRenamePlaylist={onRenamePlaylist}
        onDeletePlaylist={onDeletePlaylist}
        onNotDeletable={onNotDeletable}
        onFilter={onFilterPlaylistItems}
      />
      {list}
    </div>
  );
}

export default PlaylistPanel;
