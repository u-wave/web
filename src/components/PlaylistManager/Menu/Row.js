import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { CircularProgress } from 'material-ui/Progress';
import ActiveIcon from 'material-ui-icons/Check';
import { MEDIA } from '../../../constants/DDItemTypes';

const playlistTarget = {
  drop({ playlist, onAddToPlaylist }, monitor) {
    const { media } = monitor.getItem();
    onAddToPlaylist(playlist, media);
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

const enhance = DropTarget(MEDIA, playlistTarget, collect);

class PlaylistRow extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    playlist: PropTypes.object,
    selected: PropTypes.bool,
    isOver: PropTypes.bool.isRequired,

    connectDropTarget: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    // Used in the drop handler above 👆
    // eslint-disable-next-line react/no-unused-prop-types
    onAddToPlaylist: PropTypes.func,
  };

  render() {
    const {
      className,
      playlist,
      selected,

      onClick,

      connectDropTarget,
      isOver,
    } = this.props;
    const activeClass = playlist.active && 'is-active';
    const selectedClass = selected && 'is-selected';
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

    return connectDropTarget((
      <button
        role="menuitem"
        className={cx('PlaylistMenuRow', activeClass, selectedClass, droppableClass, className)}
        onClick={onClick}
      >
        <div className="PlaylistMenuRow-content">
          <div className="PlaylistMenuRow-title">
            {icon}
            {playlist.name}
          </div>
          <div className="PlaylistMenuRow-count">{playlist.size}</div>
        </div>
      </button>
    ));
  }
}

export default enhance(PlaylistRow);
