import cx from 'clsx';
import omit from 'just-omit';
import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import { mdiCheck } from '@mdi/js';
import SvgIcon from '../../SvgIcon';
import { MEDIA, SEARCH_RESULT } from '../../../constants/DDItemTypes';

const itemClasses = {
  root: 'PlaylistMenuRow',
  selected: 'is-selected',
};

function PlaylistRow({
  className,
  playlist,
  selected,
  onClick,
  onAddToPlaylist,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [MEDIA, SEARCH_RESULT],
    drop(_item, monitor) {
      const { media, type } = monitor.getItem();
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
  if (playlist.creating) {
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

PlaylistRow.propTypes = {
  className: PropTypes.string,
  playlist: PropTypes.object,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onAddToPlaylist: PropTypes.func,
};

export default PlaylistRow;
