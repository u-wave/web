import assign from 'object-assign';
import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import ListIcon from 'material-ui/lib/svg-icons/action/list';

const transformStyle = transform => ({
  transform: transform,
  WebkitTransform: transform
});

const getItemStyles = offset => offset
  ? assign(
      { display: 'inline-block' },
      transformStyle(`translate(${offset.x}px, ${offset.y}px)`)
    )
  : { display: 'none' };

@DragLayer(monitor => ({
  items: monitor.getItem(),
  currentOffset: monitor.getClientOffset(),
  isDragging: monitor.isDragging()
}))
export default class MediaDragLayer extends Component {
  static propTypes = {
    items: PropTypes.object,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
  };

  static contextTypes = {
    muiTheme: PropTypes.object
  };

  render() {
    const { rawTheme } = this.context.muiTheme;
    const { items, currentOffset, isDragging } = this.props;
    if (!isDragging || !items || !items.media) {
      return null;
    }
    return (
      <div className="MediaDragLayer">
        <div
          className="MediaDragLayer-preview"
          style={getItemStyles(currentOffset)}
        >
          <ListIcon
            color={rawTheme.palette.textColor}
            style={{ verticalAlign: 'bottom', marginRight: 3 }}
          />
          {items.media.length}
        </div>
      </div>
    );
  }
}
