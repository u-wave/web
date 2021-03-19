import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { MEDIA } from '../../constants/DDItemTypes';
import { useMediaListContext } from './BaseMediaList';
import MediaDuration from './MediaDuration';
import MediaLoadingIndicator from './MediaLoadingIndicator';
import MediaSourceIcon from './MediaSourceIcon';
import MediaThumbnail from './MediaThumbnail';
import MediaActions from './Actions';

const {
  useCallback,
  useEffect,
} = React;

function Row({
  className,
  media,
  note,
  style,
  selected = false,
  onClick,
  onOpenPreviewMediaDialog,
  makeActions,
}) {
  const { selection } = useMediaListContext();
  const [, drag, connectDragPreview] = useDrag({
    type: MEDIA,
    item: () => ({
      media: selected ? selection : [media],
    }),
  });

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
  }, [connectDragPreview]);

  const selectedClass = selected ? 'is-selected' : '';
  const loadingClass = media.loading ? 'is-loading' : '';

  return (
    // Bit uneasy about this, but turning the entire row into a button seems
    // wrong as well! Since we nest media action <button>s inside it, too.
    //
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cx('MediaListRow', className, selectedClass, loadingClass)}
      style={style}
      onDoubleClick={handleDoubleClick}
      onKeyPress={handleKeyPress}
      onClick={onClick}
      ref={drag}
    >
      {media.loading ? (
        <MediaLoadingIndicator className="MediaListRow-loader" />
      ) : (
        <MediaThumbnail url={media.thumbnail} />
      )}
      <div className={cx('MediaListRow-data', note && 'has-note')}>
        <div className="MediaListRow-artist" title={media.artist}>
          {media.artist}
        </div>
        <div className="MediaListRow-title" title={media.title}>
          {media.title}
        </div>
        {note ? (
          <div className="MediaListRow-note">
            {note}
          </div>
        ) : null}
      </div>
      <div className="MediaListRow-duration">
        <MediaDuration media={media} />
      </div>
      <div className="MediaListRow-icon">
        <MediaSourceIcon sourceType={media.sourceType} />
      </div>
      <MediaActions
        className={cx('MediaListRow-actions', selectedClass)}
        selection={selection}
        media={media}
        makeActions={makeActions}
      />
    </div>
  );
}

Row.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // from react-window
  media: PropTypes.object,
  note: PropTypes.node,
  selected: PropTypes.bool,
  onOpenPreviewMediaDialog: PropTypes.func,
  onClick: PropTypes.func,
  makeActions: PropTypes.func,
};

export default Row;
