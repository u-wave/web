import React from 'react';
import PropTypes from 'prop-types';
import ListIcon from '@material-ui/icons/List';
import transformStyle from '../../utils/transformStyle';

const getItemStyles = offset => (
  offset ? Object.assign(
    { display: 'inline-block' },
    transformStyle(`translate(${offset.x}px, ${offset.y}px)`),
  ) : { display: 'none' }
);

const MediaDragPreview = ({
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
      <ListIcon className="MediaDragPreview-icon" />
      {items.media.length}
    </div>
  );
};

MediaDragPreview.propTypes = {
  items: PropTypes.object,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};

export default MediaDragPreview;
