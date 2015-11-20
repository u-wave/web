import cx from 'classnames';
import React from 'react';
import MediaList from '../../MediaList';
import Loader from '../../Loader';
import PlaylistMeta from './Meta';

const PlaylistPanel = ({ className, playlist, media, loading }) => {
  const list = loading
    ? <div className="PlaylistPanel-loading">
        <Loader size="large" />
      </div>
    : <MediaList
        className="PlaylistPanel-media"
        media={media}
      />;

  return (
    <div className={cx('PlaylistPanel', className)}>
      <PlaylistMeta
        className="PlaylistPanel-meta"
        id={playlist._id}
        name={playlist.name}
        active={playlist.active}
      />
      {list}
    </div>
  );
};

export default PlaylistPanel;
