import cx from 'clsx';
import omit from 'just-omit';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import { mdiCheck } from '@mdi/js';
import { useEffect, useRef, useState } from 'react';
import SvgIcon from '../../SvgIcon';
import { MEDIA, SEARCH_RESULT } from '../../../constants/DDItemTypes';
import type { NewPlaylistItem, Playlist, PlaylistItem } from '../../../reducers/playlists';

const itemClasses = {
  root: 'PlaylistMenuRow',
  selected: 'is-selected',
};

type PlaylistRowProps = {
  className?: string,
  playlist: Playlist,
  selected: boolean,
  onClick: () => void,
  onAddToPlaylist:
    (playlist: Playlist, items: NewPlaylistItem[], afterID?: string) => Promise<void>,
  onDoubleClick: () => void;
};
function PlaylistRow({
  className,
  playlist,
  selected,
  onClick,
  onAddToPlaylist,
  onDoubleClick,
}: PlaylistRowProps) {
  const droppableRef = useRef<HTMLLIElement>(null);
  const [isOver, setOver] = useState(false);
  useEffect(() => {
    if (droppableRef.current == null) return undefined;

    return dropTargetForElements({
      element: droppableRef.current,
      canDrop: ({ source }) => source.data.type === MEDIA || source.data.type === SEARCH_RESULT,
      getIsSticky: () => true,
      onDragEnter: () => {
        setOver(true);
      },
      onDragLeave: () => {
        setOver(false);
      },
      onDrop: ({ source }) => {
        setOver(false);

        let media;
        if (source.data.type === MEDIA) {
          media = source.data.media as PlaylistItem[];
        } else if (source.data.type === SEARCH_RESULT) {
          media = (source.data.media as PlaylistItem[]).map((item) => omit(item, ['artist', 'title']));
        } else {
          return;
        }

        onAddToPlaylist(playlist, media);
      },
      // getData: ({ input, element }) => {
      //   return attachClosestEdge({
      //     media,
      //   }, {
      //     input,
      //     element,
      //     allowedEdges: ['top', 'bottom'],
      //   });
      // },
    });
  }, [onAddToPlaylist, playlist]);

  const activeClass = playlist.active && 'is-active';
  const droppableClass = isOver && 'is-droppable';

  let icon;
  if (playlist.loading) {
    icon = (
      <div className="PlaylistMenuRow-loading">
        <CircularProgress size="100%" />
      </div>
    );
  } else if (playlist.active) {
    icon = (
      <div className="PlaylistMenuRow-active-icon">
        <SvgIcon path={mdiCheck} />
      </div>
    );
  }

  return (
    <MenuItem
      selected={selected}
      className={cx(className, activeClass, droppableClass)}
      classes={itemClasses}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      ref={droppableRef}
    >
      <div className="PlaylistMenuRow-title">
        {icon}
        {playlist.name}
      </div>
      <div className="PlaylistMenuRow-count">{playlist.size}</div>
    </MenuItem>
  );
}

export default PlaylistRow;
