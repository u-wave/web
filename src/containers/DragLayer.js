import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import { MEDIA } from '../constants/DDItemTypes';

import MediaDragPreview from '../components/MediaList/MediaDragPreview';

@DragLayer(monitor => ({
  items: monitor.getItem(),
  type: monitor.getItemType(),
  currentOffset: monitor.getClientOffset(),
  isDragging: monitor.isDragging()
}))
export default class DragLayerContainer extends Component {
  static propTypes = {
    type: PropTypes.oneOf([ MEDIA ]),
    items: PropTypes.object,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
  };

  renderPreview(type, props) {
    switch (type) {
    case MEDIA:
      return <MediaDragPreview {...props} />;
    default:
      return null;
    }
  }

  render() {
    const { isDragging, items, type } = this.props;
    if (!isDragging || !items) {
      return null;
    }

    return (
      <div className="DragLayerContainer">
        {this.renderPreview(type, this.props)}
      </div>
    );
  }
}
