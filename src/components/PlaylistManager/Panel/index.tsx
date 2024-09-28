import cx from 'clsx';
import { useEffect } from 'react';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { monitorForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import { containsURLs, getURLs } from '@atlaskit/pragmatic-drag-and-drop/external/url';
import type { BaseEventPayload, ExternalDragType } from '@atlaskit/pragmatic-drag-and-drop/types';
import CircularProgress from '@mui/material/CircularProgress';
import BaseMediaList from '../../MediaList/BaseMediaList';
import PlaylistMeta from './Meta';
import PlaylistEmpty from './PlaylistEmpty';
import PlaylistFilterEmpty from './PlaylistFilterEmpty';
import PlaylistItemRow from './PlaylistItemRow';
import DroppablePlaylistItemRow, { isPlaylistItemData } from './DroppablePlaylistItemRow';
import type {
  InsertTarget, NewPlaylistItem, Playlist, PlaylistItem,
} from '../../../reducers/playlists';
import { MEDIA } from '../../../constants/DDItemTypes';
import { useMediaSources } from '../../../context/MediaSourceContext';

function isMediaDrag(x: Record<string, unknown>): x is { media: PlaylistItem[] } {
  return x.type === MEDIA;
}

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
  onAddToPlaylist: (items: NewPlaylistItem[], target: InsertTarget) => Promise<void>,
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
    onAddToPlaylist,
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

  const sources = useMediaSources().getAllMediaSources();
  useEffect(() => {
    if (isFiltered) {
      return undefined;
    }

    function getMediaFromUrl(event: Pick<BaseEventPayload<ExternalDragType>, 'source'>) {
      const [s] = getURLs(event);
      if (s == null) {
        return null;
      }
      const url = new URL(s);
      for (const source of Object.values(sources)) {
        const candidate = source.fromMediaUrl?.(url);
        if (candidate != null) {
          return candidate;
        }
      }
      return null;
    }

    return combine(
      monitorForElements({
        canMonitor: (event) => {
          return isMediaDrag(event.source.data);
        },
        onDrop: ({ source, location }) => {
          const [target] = location.current.dropTargets;
          if (!isMediaDrag(source.data)) return;
          if (target == null || !isPlaylistItemData(target.data)) return;

          const edge = extractClosestEdge(target.data);
          onMoveMedia(source.data.media, edge === 'top' ? { before: target.data.media._id } : { after: target.data.media._id });
        },
      }),
      monitorForExternal({
        canMonitor: containsURLs,
        onDrop(event) {
          const [target] = event.location.current.dropTargets;
          if (target == null || !isPlaylistItemData(target.data)) return;
          const insert = getMediaFromUrl(event);
          if (insert == null) return;

          const edge = extractClosestEdge(target.data);
          onAddToPlaylist([insert], edge === 'top' ? { before: target.data.media._id } : { after: target.data.media._id });
        },
      }),
    );
  }, [isFiltered, onMoveMedia, onAddToPlaylist, sources]);

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
