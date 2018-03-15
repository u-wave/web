import React from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import { MEDIA, WAITLIST_USER } from '../constants/DDItemTypes';
import MediaDragPreview from '../components/MediaList/MediaDragPreview';

const enhance = DragLayer(monitor => ({
  items: monitor.getItem(),
  type: monitor.getItemType(),
  currentOffset: monitor.getClientOffset(),
  isDragging: monitor.isDragging(),
}));

class DragLayerContainer extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf([MEDIA, WAITLIST_USER]),
    items: PropTypes.object,
    isDragging: PropTypes.bool.isRequired,
  };

  renderPreview() {
    switch (this.props.type) {
      case MEDIA:
        return <MediaDragPreview {...this.props} />;
      default:
        return null;
    }
  }

  render() {
    const { isDragging, items } = this.props;
    if (!isDragging || !items) {
      return null;
    }

    return (
      <div className="DragLayerContainer">
        {this.renderPreview()}
      </div>
    );
  }
}

export default enhance(DragLayerContainer);
