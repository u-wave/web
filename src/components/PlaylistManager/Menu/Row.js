import cx from 'classnames';
import React from 'react';
import { DropTarget } from 'react-dnd';
import ActiveIcon from 'material-ui/lib/svg-icons/navigation/check';
import { MEDIA } from '../../../constants/DDItemTypes';
import { addMedia } from '../../../actions/PlaylistActionCreators';
import Loader from '../../Loader';

const playlistTarget = {
  drop({ playlist }, monitor) {
    const { media } = monitor.getItem();
    addMedia(playlist, media);
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
    onClick: React.PropTypes.func,
    connectDropTarget: React.PropTypes.func.isRequired,
    isOver: React.PropTypes.bool.isRequired
  };

  render() {
    const {
      className, playlist, onClick,
      connectDropTarget, isOver
    } = this.props;
    const activeClass = playlist.active && 'is-active';
    const selectedClass = playlist.selected && 'is-selected';
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
      <div
        className={cx('PlaylistMenuRow', activeClass, selectedClass, droppableClass, className)}
        onClick={onClick}
      >
        {icon}
        {playlist.name}
        <span className="PlaylistMenuRow-count">{playlist.size}</span>
      </div>
    );
  }
}
