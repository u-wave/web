import assign from 'object-assign';
import React from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ListIcon from 'material-ui/svg-icons/action/list';

import transformStyle from '../../utils/transformStyle';

const getItemStyles = offset => (
  offset ? assign(
    { display: 'inline-block' },
    transformStyle(`translate(${offset.x}px, ${offset.y}px)`),
  ) : { display: 'none' }
);

const dragIconStyle = {
  verticalAlign: 'bottom',
  marginRight: 3,
};

const MediaDragPreview = ({
  muiTheme,
  items,
  currentOffset,
}) => {
  if (!items || !items.media) {
    return null;
  }
  return (
    <div
      className="MediaDragPreview"
      style={getItemStyles(currentOffset)}
    >
      <ListIcon
        color={muiTheme.palette.textColor}
        style={dragIconStyle}
      />
      {items.media.length}
    </div>
  );
};

MediaDragPreview.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  items: PropTypes.object,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};

export default muiThemeable()(MediaDragPreview);
