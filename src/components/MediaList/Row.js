import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import formatDuration from 'format-duration';
import { MEDIA } from '../../constants/DDItemTypes';
import MediaLoadingIndicator from './MediaLoadingIndicator';
import MediaThumbnail from './MediaThumbnail';
import Actions from './Actions';

const {
  useCallback,
  useEffect,
} = React;

const inSelection = (selection, media) => selection.some(item => item._id === media._id);

const mediaSource = {
  beginDrag({ selection, media }) {
    return {
      media: inSelection(selection, media) ? selection : [media],
    };
  },
};

const collect = connect => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
});

const enhance = DragSource(MEDIA, mediaSource, collect);

function Row({
  className,
  media,
  selected = false,
  selection,
  connectDragSource,
  connectDragPreview,
  onClick,
  onOpenPreviewMediaDialog,
  makeActions,
}) {
  const handleKeyPress = useCallback((event) => {
    if (event.code === 'Space') {
      onClick();
    }
  }, [onClick]);

  const handleDoubleClick = useCallback(() => {
    onOpenPreviewMediaDialog(media);
  }, [onOpenPreviewMediaDialog, media]);

  useEffect(() => {
    connectDragPreview(getEmptyImage());
  }, []);

  const selectedClass = selected ? 'is-selected' : '';
  const loadingClass = media.loading ? 'is-loading' : '';
  const duration = 'start' in media
    // playlist item
    ? media.end - media.start
    // search result
    : media.duration;

  return connectDragSource((
    // Bit uneasy about this, but turning the entire row into a button seems
    // wrong as well! Since we nest media action <button>s inside it, too.
    //
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cx('MediaListRow', className, selectedClass, loadingClass)}
      onDoubleClick={handleDoubleClick}
      onKeyPress={handleKeyPress}
      onClick={onClick}
    >
      {media.loading ? (
        <MediaLoadingIndicator className="MediaListRow-loader" />
      ) : (
        <MediaThumbnail url={media.thumbnail} />
      )}
      <div className="MediaListRow-artist" title={media.artist}>
        {media.artist}
      </div>
      <div className="MediaListRow-title" title={media.title}>
        {media.title}
      </div>
      <div className="MediaListRow-duration">
        {formatDuration(duration * 1000)}
      </div>
      <Actions
        className={cx('MediaListRow-actions', selectedClass)}
        selection={selection}
        media={media}
        makeActions={makeActions}
      />
    </div>
  ));
}

Row.propTypes = {
  className: PropTypes.string,
  media: PropTypes.object,
  selected: PropTypes.bool,
  selection: PropTypes.array,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  onOpenPreviewMediaDialog: PropTypes.func,
  onClick: PropTypes.func,
  makeActions: PropTypes.func,
};

export default enhance(Row);
