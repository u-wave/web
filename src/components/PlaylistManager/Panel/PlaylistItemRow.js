import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { MEDIA } from '../../../constants/DDItemTypes';
import isDraggingNearTopOfRow from '../../../utils/isDraggingNearTopOfRow';
import MediaRow from '../../MediaList/Row';

const mediaTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const { media } = item;
    if (media) {
      const thisID = props.media._id;
      // Do not attempt to move when the selection is dropped on top of an item
      // that is in the selection.
      if (media.some(playlistItem => playlistItem._id === thisID)) {
        return;
      }
      const insertBefore = isDraggingNearTopOfRow(monitor, component);
      props.onMoveMedia(
        media,
        insertBefore ? { before: thisID } : { after: thisID },
      );
    }
  },
  hover(props, monitor, component) {
    component.setState({
      insertingAbove: isDraggingNearTopOfRow(monitor, component),
    });
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class PlaylistItemRow extends React.Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    // Used in the drop handler above 👆
    // eslint-disable-next-line react/no-unused-prop-types
    onMoveMedia: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
  };

  state = {
    insertingAbove: false,
  };

  render() {
    const {
      connectDropTarget,
      isOver,
      ...props
    } = this.props;
    const { insertingAbove } = this.state;

    const dropIndicator = <div className="PlaylistItemRow-drop-indicator" />;

    return connectDropTarget((
      <div className="PlaylistItemRow">
        {isOver && insertingAbove && dropIndicator}
        <MediaRow {...props} />
        {isOver && !insertingAbove && dropIndicator}
      </div>
    ));
  }
}

export default DropTarget(MEDIA, mediaTarget, collect)(PlaylistItemRow);
