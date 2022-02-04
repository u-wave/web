import React from 'react';
import PropTypes from 'prop-types';
import ListIcon from '@mui/icons-material/List';

function MediaDragPreview({ items }) {
  if (!items || !items.media) {
    return null;
  }
  return (
    <div className="MediaDragPreview">
      <ListIcon className="MediaDragPreview-icon" />
      {items.media.length}
    </div>
  );
}

MediaDragPreview.propTypes = {
  items: PropTypes.object,
};

export default MediaDragPreview;
