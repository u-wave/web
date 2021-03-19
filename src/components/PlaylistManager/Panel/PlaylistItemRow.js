import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import MediaDuration from '../../MediaList/MediaDuration';
import MediaLoadingIndicator from '../../MediaList/MediaLoadingIndicator';
import MediaRowBase from '../../MediaList/MediaRowBase';
import MediaSourceIcon from '../../MediaList/MediaSourceIcon';
import MediaThumbnail from '../../MediaList/MediaThumbnail';
import PlaylistItemActions from './PlaylistItemActions';

function PlaylistItemRow({
  className,
  style,
  containerRef,
  index,
  media,
  onClick,
}) {
  const loadingClass = media.loading ? 'is-loading' : '';

  // Wrapper div to make sure that hovering the drop indicator
  // does not change the hover state to a different element, which
  // would cause thrashing.
  return (
    <MediaRowBase
      className={cx(className, loadingClass)}
      style={style}
      containerRef={containerRef}
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
  );
}

PlaylistItemRow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // from react-window
  index: PropTypes.number.isRequired,
  containerRef: PropTypes.any,
  media: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PlaylistItemRow;
