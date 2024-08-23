import cx from 'clsx';
import omit from 'just-omit';
import { useDrop } from 'react-dnd';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import { mdiCheck } from '@mdi/js';
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
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [MEDIA, SEARCH_RESULT],
    drop(_item, monitor) {
      // FIXME for search results it's not actually a playlist item
      const { media, type } = monitor.getItem() as { media: PlaylistItem[], type: string };
      if (type === SEARCH_RESULT) {
        onAddToPlaylist(playlist, media.map((item) => omit(item, ['artist', 'title'])));
      } else {
        onAddToPlaylist(playlist, media);
      }
    },
    collect(monitor) {
      return { isOver: monitor.isOver() };
    },
  }), [playlist]);

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
      ref={drop}
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
