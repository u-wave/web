import React from 'react';
import PropTypes from 'prop-types';
import { mdiFormatListBulleted } from '@mdi/js';
import SvgIcon from '../SvgIcon';

const getItemStyles = (offset) => (
  offset ? ({
    display: 'inline-block',
    transform: `translate(${offset.x}px, ${offset.y}px)`,
  }) : { display: 'none' }
);

function MediaDragPreview({
  items,
  currentOffset,
}) {
  if (!items || !items.media) {
    return null;
  }
  return (
    <div
      className="MediaDragPreview"
      style={getItemStyles(currentOffset)}
    >
      <SvgIcon path={mdiFormatListBulleted} className="MediaDragPreview-icon" />
      {items.media.length}
    </div>
  );
}

MediaDragPreview.propTypes = {
  items: PropTypes.object,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};

export default MediaDragPreview;
