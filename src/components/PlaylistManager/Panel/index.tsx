import cx from 'clsx';
import CircularProgress from '@mui/material/CircularProgress';
import BaseMediaList from '../../MediaList/BaseMediaList';
import PlaylistMeta from './Meta';
import PlaylistEmpty from './PlaylistEmpty';
import PlaylistFilterEmpty from './PlaylistFilterEmpty';
import PlaylistItemRow from './PlaylistItemRow';
import DroppablePlaylistItemRow from './DroppablePlaylistItemRow';
import type { InsertTarget, Playlist, PlaylistItem } from '../../../reducers/playlists';

type PlaylistPanelProps = {
  className?: string,
  playlist: Playlist,
  media: (PlaylistItem | null)[],
  loading: boolean,
  isFiltered: boolean,
  onShufflePlaylist: () => Promise<void>,
  onActivatePlaylist: () => Promise<void>,
  onRenamePlaylist: (newName: string) => Promise<void>,
  onDeletePlaylist: () => Promise<void>,
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
    onLoadPlaylistPage,
    onFilterPlaylistItems,
    onMoveMedia,
  } = props;

  const size = media.length;

  let list;
  if (loading && size > 0 && media.every((item) => item == null)) {
    list = (
      <div className="PlaylistPanel-loading">
        <CircularProgress size="100%" />
      </div>
    );
  } else if (isFiltered && size === 0) {
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
        onFilter={onFilterPlaylistItems}
      />
      {list}
    </div>
  );
}

export default PlaylistPanel;
