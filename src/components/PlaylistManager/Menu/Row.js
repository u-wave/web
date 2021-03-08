import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import ActiveIcon from '@material-ui/icons/Check';
import { MEDIA } from '../../../constants/DDItemTypes';

const itemClasses = {
  root: 'PlaylistMenuRow',
  selected: 'is-selected',
};

function PlaylistRow({
  playlist,
  selected,
  onClick,
  onAddToPlaylist,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: MEDIA,
    drop(item, monitor) {
      const { media } = monitor.getItem();
      onAddToPlaylist(playlist, media);
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
        <ActiveIcon />
      </div>
    );
  }

  return (
    <MenuItem
      selected={selected}
      className={cx(activeClass, droppableClass)}
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
  playlist: PropTypes.object,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onAddToPlaylist: PropTypes.func,
};

export default PlaylistRow;
