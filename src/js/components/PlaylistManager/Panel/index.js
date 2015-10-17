import cx from 'classnames';
import React from 'react';
import MediaList from '../../MediaList';
import Loader from '../../Loader';
import PlaylistMeta from './Meta';

export default class Panel extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    playlist: React.PropTypes.object,
    media: React.PropTypes.array,
    loading: React.PropTypes.bool
  };

  render() {
    const { className, playlist, media, loading } = this.props;

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
  }
}
