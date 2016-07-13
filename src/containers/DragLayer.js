import * as React from 'react';
import { DragLayer } from 'react-dnd';
import { MEDIA, WAITLIST_USER } from '../constants/DDItemTypes';

import MediaDragPreview from '../components/MediaList/MediaDragPreview';

@DragLayer(monitor => ({
  items: monitor.getItem(),
  type: monitor.getItemType(),
  currentOffset: monitor.getClientOffset(),
  isDragging: monitor.isDragging()
}))
export default class DragLayerContainer extends React.Component {
  static propTypes = {
    type: React.PropTypes.oneOf([ MEDIA, WAITLIST_USER ]),
    items: React.PropTypes.object,
    isDragging: React.PropTypes.bool.isRequired
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
