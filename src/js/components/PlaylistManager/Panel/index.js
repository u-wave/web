import cx from 'classnames';
import React from 'react';
import MediaList from '../../MediaList';
import PlaylistMeta from './Meta';

export default class Panel extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    playlist: React.PropTypes.object,
    media: React.PropTypes.array
  };

  render() {
    const { className, playlist, media } = this.props;

    return (
      <div className={cx('PlaylistPanel', className)}>
        <PlaylistMeta
          className="PlaylistPanel-meta"
          id={playlist._id}
          name={playlist.name}
          active={playlist.active}
        />

        <MediaList
          className="PlaylistPanel-media"
          media={media}
        />
      </div>
    );
  }
}
