import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import MediaRowBase from './MediaRowBase';
import MediaDuration from './MediaDuration';
import MediaLoadingIndicator from './MediaLoadingIndicator';
import MediaSourceIcon from './MediaSourceIcon';
import MediaThumbnail from './MediaThumbnail';
import MediaActions from './Actions';

const {
  useCallback,
} = React;

function Row({
  className,
  media,
  style,
  onClick,
  onOpenPreviewMediaDialog,
  makeActions,
}) {
  const handleDoubleClick = useCallback(() => {
    onOpenPreviewMediaDialog(media);
  }, [onOpenPreviewMediaDialog, media]);

  const loadingClass = media.loading ? 'is-loading' : '';

  return (
    <MediaRowBase
      media={media}
      className={cx(className, loadingClass)}
      style={style}
      onDoubleClick={handleDoubleClick}
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
      <MediaActions
        className="MediaListRow-actions"
        media={media}
        makeActions={makeActions}
      />
    </MediaRowBase>
  );
}

Row.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // from react-window
  media: PropTypes.object,
  onOpenPreviewMediaDialog: PropTypes.func,
  onClick: PropTypes.func,
  makeActions: PropTypes.func,
};

export default Row;
