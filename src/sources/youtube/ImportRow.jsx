import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { SEARCH_RESULT } from '../../constants/DDItemTypes';
import MediaRowBase from '../../components/MediaList/MediaRowBase';
import MediaDuration from '../../components/MediaList/MediaDuration';
import MediaThumbnail from '../../components/MediaList/MediaThumbnail';
import AddToPlaylistAction from '../../components/MediaList/AddToPlaylistAction';
import PreviewMediaAction from '../../components/MediaList/PreviewMediaAction';

function ImportRow({
  className,
  media,
  style,
  onClick,
}) {
  return (
    <MediaRowBase
      media={media}
      className={cx(className, 'ImportRow')}
      style={style}
      onClick={onClick}
      dragType={SEARCH_RESULT}
    >
      <MediaThumbnail url={media.thumbnail} />
      <div className={cx('MediaListRow-data')}>
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
      <div className="MediaActions MediaListRow-actions">
        <PreviewMediaAction media={media} />
        <AddToPlaylistAction media={media} withCustomMeta={false} />
      </div>
    </MediaRowBase>
  );
}

ImportRow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // from virtual list positioning
  media: PropTypes.object,
  onClick: PropTypes.func,
};

export default ImportRow;
