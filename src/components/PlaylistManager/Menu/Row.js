import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useDroppable } from '@dnd-kit/core';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import ActiveIcon from '@mui/icons-material/Check';
import { PLAYLIST } from '../../../constants/DDItemTypes';

const itemClasses = {
  root: 'PlaylistMenuRow',
  selected: 'is-selected',
};

function PlaylistRow({
  className,
  playlist,
  selected,
  onClick,
}) {
  const {
    attributes,
    listeners,
    isOver,
    setNodeRef,
  } = useDroppable({
    id: playlist._id,
    data: {
      type: PLAYLIST,
      playlist,
    },
  });

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
        <ActiveIcon />
      </div>
    );
  }

  return (
    <MenuItem
      selected={selected}
      className={cx(className, activeClass, droppableClass)}
      classes={itemClasses}
      onClick={onClick}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
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
