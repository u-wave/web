import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { MEDIA } from '../../../constants/DDItemTypes';
import isDraggingNearTopOfRow from '../../../utils/isDraggingNearTopOfRow';
import MediaDuration from '../../MediaList/MediaDuration';
import MediaLoadingIndicator from '../../MediaList/MediaLoadingIndicator';
import MediaRowBase from '../../MediaList/MediaRowBase';
import MediaSourceIcon from '../../MediaList/MediaSourceIcon';
import MediaThumbnail from '../../MediaList/MediaThumbnail';
import PlaylistItemActions from './PlaylistItemActions';

const {
  useEffect,
  useRef,
  useState,
} = React;

function PlaylistItemRow({
  style,
  index,
  media,
  onClick,
  onMoveMedia,
}) {
  const [insertingAbove, setInsertAbove] = useState(false);
  const refWrapper = useRef(null);
  const [{ isOver }, connectDropTarget] = useDrop(() => ({
    accept: MEDIA,
    drop(item, monitor) {
      const { media: droppedItems } = monitor.getItem();
      if (droppedItems) {
        // Do not attempt to move when the selection is dropped on top of an item
        // that is in the selection.
        if (droppedItems.some((playlistItem) => playlistItem._id === media._id)) {
          return;
        }
        const insertBefore = isDraggingNearTopOfRow(monitor, refWrapper.current);
        onMoveMedia(
          droppedItems,
          insertBefore ? { before: media._id } : { after: media._id },
        );
      }
    },
    hover(item, monitor) {
      setInsertAbove(isDraggingNearTopOfRow(monitor, refWrapper.current));
    },
    collect(monitor) {
      return { isOver: monitor.isOver() };
    },
  }), [media]);

  useEffect(() => {
    connectDropTarget(refWrapper.current);
  }, [connectDropTarget]);

  const dropIndicator = <div className="PlaylistItemRow-drop-indicator" />;

  const loadingClass = media.loading ? 'is-loading' : '';

  // Wrapper div to make sure that hovering the drop indicator
  // does not change the hover state to a different element, which
  // would cause thrashing.
  return (
    <div className="PlaylistItemRow" style={style} ref={refWrapper}>
      {isOver && insertingAbove && dropIndicator}
      <MediaRowBase
        className={loadingClass}
        media={media}
        onClick={onClick}
      >
        {media.loading ? (
          <MediaLoadingIndicator className="MediaListRow-loader" />
        ) : (
          <MediaThumbnail url={media.thumbnail} />
        )}
        <div className="MediaListRow-data">
          <div className="MediaListRow-artist" title={media.artist}>
            {media.artist}
          </div>
          <div className="MediaListRow-title" title={media.title}>
            {media.title}
          </div>
        </div>
        <div className="MediaListRow-duration">
          <MediaDuration media={media} />
        </div>
        <div className="MediaListRow-icon">
          <MediaSourceIcon sourceType={media.sourceType} />
        </div>
        <PlaylistItemActions
          className="MediaListRow-actions"
          index={index}
          media={media}
        />
      </MediaRowBase>
      {isOver && !insertingAbove && dropIndicator}
    </div>
  );
}

PlaylistItemRow.propTypes = {
  style: PropTypes.object, // from react-window
  index: PropTypes.number.isRequired,
  media: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onMoveMedia: PropTypes.func.isRequired,
};

export default PlaylistItemRow;
