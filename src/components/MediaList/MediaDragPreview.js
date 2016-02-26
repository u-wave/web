import assign from 'object-assign';
import React, { Component, PropTypes } from 'react';
import ListIcon from 'material-ui/lib/svg-icons/action/list';

const transformStyle = transform => ({
  transform,
  WebkitTransform: transform
});

const getItemStyles = offset => offset
  ? assign(
      { display: 'inline-block' },
      transformStyle(`translate(${offset.x}px, ${offset.y}px)`)
    )
  : { display: 'none' };

export default class MediaDragPreview extends Component {
  static propTypes = {
    items: PropTypes.object,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  };

  static contextTypes = {
    muiTheme: PropTypes.object
  };

  render() {
    const { rawTheme } = this.context.muiTheme;
    const { items, currentOffset } = this.props;
    if (!items || !items.media) {
      return null;
    }
    return (
      <div
        className="MediaDragPreview"
        style={getItemStyles(currentOffset)}
      >
        <ListIcon
          color={rawTheme.palette.textColor}
          style={{ verticalAlign: 'bottom', marginRight: 3 }}
        />
        {items.media.length}
      </div>
    );
  }
}
