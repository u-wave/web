import cx from 'classnames';
import React from 'react';
import MediaList from '../../MediaList';

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
        <div className="PlaylistPanel-meta">
          {playlist.name}
        </div>

        <MediaList
          className="PlaylistPanel-media"
          media={media}
        />
      </div>
    );
  }
}
