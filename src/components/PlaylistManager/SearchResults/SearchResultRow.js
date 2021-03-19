import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import MediaRowBase from '../../MediaList/MediaRowBase';
import MediaDuration from '../../MediaList/MediaDuration';
import MediaThumbnail from '../../MediaList/MediaThumbnail';
import SearchResultActions from './SearchResultActions';

function SearchResultRow({
  className,
  media,
  style,
  onClick,
}) {
  let note = null;
  if (media.inPlaylists) {
    note = (
      <>
        In playlists:{' '}
        {media.inPlaylists.map((playlist) => playlist.name).join(', ')}
      </>
    );
  }

  return (
    <MediaRowBase
      media={media}
      className={className}
      style={style}
      onClick={onClick}
    >
      <MediaThumbnail url={media.thumbnail} />
      <div className={cx('MediaListRow-data', 'SearchResultRow-data', note && 'has-note')}>
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
      <SearchResultActions className="MediaListRow-actions" media={media} />
    </MediaRowBase>
  );
}

SearchResultRow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object, // from react-window
  media: PropTypes.object,
  onClick: PropTypes.func,
};

export default SearchResultRow;
