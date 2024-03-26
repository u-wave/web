import cx from 'clsx';
import React from 'react';
import MediaRowBase from './MediaRowBase';
import MediaDuration from './MediaDuration';
import MediaLoadingIndicator from './MediaLoadingIndicator';
import MediaSourceIcon from './MediaSourceIcon';
import MediaThumbnail from './MediaThumbnail';
import MediaActions from './MediaActions';
import type { Media } from '../../reducers/booth';

type MediaRowProps = {
  className?: string,
  media: Media,
  style: React.CSSProperties,
  onClick: (event?: React.MouseEvent) => void,
};
function MediaRow({
  className,
  media,
  style,
  onClick,
}: MediaRowProps) {
  const isLoading = 'loading' in media && typeof media.loading === 'boolean' && media.loading;

  return (
    <MediaRowBase
      media={media}
      className={cx(className, isLoading ? 'is-loading' : '')}
      style={style}
      onClick={onClick}
    >
      {isLoading ? (
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

export default React.memo(MediaRow);
