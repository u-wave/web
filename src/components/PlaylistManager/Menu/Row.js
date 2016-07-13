import cx from 'classnames';
import * as React from 'react';
import { DropTarget } from 'react-dnd';
import ActiveIcon from 'material-ui/svg-icons/navigation/check';
import { MEDIA } from '../../../constants/DDItemTypes';
import Loader from '../../Loader';

const playlistTarget = {
  drop({ playlist, onAddToPlaylist }, monitor) {
    const { media } = monitor.getItem();
    onAddToPlaylist(playlist, media);
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

@DropTarget(MEDIA, playlistTarget, collect)
export default class PlaylistRow extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    playlist: React.PropTypes.object,
    selected: React.PropTypes.bool,
    isOver: React.PropTypes.bool.isRequired,

    connectDropTarget: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func,
    // Used in the drop handler above 👆
    // eslint-disable-next-line react/no-unused-prop-types
    onAddToPlaylist: React.PropTypes.func
  };

  render() {
    const {
      className,
      playlist,
      selected,

      onClick,

      connectDropTarget,
      isOver
    } = this.props;
    const activeClass = playlist.active && 'is-active';
    const selectedClass = selected && 'is-selected';
    const droppableClass = isOver && 'is-droppable';

    let icon;
    if (playlist.creating) {
      icon = (
        <div className="PlaylistMenuRow-loading">
          <Loader size="tiny" />
        </div>
      );
    } else if (playlist.active) {
      icon = (
        <div className="PlaylistMenuRow-active-icon">
          <ActiveIcon color="#fff" />
        </div>
      );
    }

    return connectDropTarget(
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
    );
  }
}
