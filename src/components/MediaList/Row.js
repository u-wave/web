import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import MediaRowBase from './MediaRowBase';
import MediaDuration from './MediaDuration';
import MediaLoadingIndicator from './MediaLoadingIndicator';
import MediaSourceIcon from './MediaSourceIcon';
import MediaThumbnail from './MediaThumbnail';
import MediaActions from './MediaActions';

function MediaRow({
  className,
  media,
  style,
  onClick,
}) {
  const loadingClass = media.loading ? 'is-loading' : '';

  return (
    <MediaRowBase
      media={media}
      className={cx(className, loadingClass)}
      style={style}
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
      />
    </MediaRowBase>
  );
}

MediaRow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // from react-window
  media: PropTypes.object,
  onClick: PropTypes.func,
};

export default MediaRow;
