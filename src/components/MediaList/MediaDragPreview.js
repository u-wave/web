/* eslint-disable react/prefer-stateless-function */
import assign from 'object-assign';
import React, { Component, PropTypes } from 'react';
import ListIcon from 'material-ui/lib/svg-icons/action/list';

import transformStyle from '../../utils/transformStyle';

const getItemStyles = offset => (
  offset ? assign(
    { display: 'inline-block' },
    transformStyle(`translate(${offset.x}px, ${offset.y}px)`)
  ) : { display: 'none' }
);

const dragIconStyle = {
  verticalAlign: 'bottom',
  marginRight: 3
};

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
          style={dragIconStyle}
        />
        {items.media.length}
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
