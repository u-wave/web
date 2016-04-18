import cx from 'classnames';
import * as React from 'react';

import IconButton from 'material-ui/IconButton';
import ImportIcon from 'material-ui/svg-icons/av/playlist-add';

export default class PlaylistRow extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    playlist: React.PropTypes.object.isRequired,

    onImport: React.PropTypes.func.isRequired
  };

  handleImportPlaylist = () => {
    this.props.onImport();
  };

  render() {
    const {
      className,
      playlist,
      // etc
      ...attrs
    } = this.props;

    const thumbnail = (
      <div className="MediaListRow-thumb">
        <img
          className="MediaListRow-image"
          key={playlist.id}
          src={playlist.thumbnail}
          alt=""
        />
      </div>
    );

    return (
      <div
        className={cx('MediaListRow', 'yt-import-PlaylistRow', className)}
        {...attrs}
      >
        {thumbnail}
        <div className="yt-import-PlaylistRow-info" title={playlist.description}>
          <div className="yt-import-PlaylistRow-name">
            {playlist.name}
          </div>
          <div className="yt-import-PlaylistRow-size">
            Items: {playlist.size}
          </div>
        </div>
        <div className="yt-import-PlaylistRow-import">
          <IconButton
            style={{
              width: '100%',
              height: '100%'
            }}
            onClick={this.handleImportPlaylist}
          >
            <ImportIcon color="#fff" />
          </IconButton>
        </div>
      </div>
    );
  }
}
