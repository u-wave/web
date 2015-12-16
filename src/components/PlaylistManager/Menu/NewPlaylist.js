import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import CreatePlaylistIcon from 'material-ui/lib/svg-icons/content/add';

export default class NewPlaylist extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  render() {
    const { className, onClick } = this.props;
    return (
      <div
        className={cx('PlaylistMenuRow', 'PlaylistMenuRow--create', className)}
        onClick={onClick}
      >
        <div className="PlaylistMenuRow-title">
          <div className="PlaylistMenuRow-active-icon">
            <CreatePlaylistIcon color="#fff" />
          </div>
          Create Playlist
        </div>
      </div>
    );
  }
}
