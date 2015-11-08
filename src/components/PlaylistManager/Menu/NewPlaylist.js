import cx from 'classnames';
import React from 'react';
import CreatePlaylistIcon from 'material-ui/lib/svg-icons/content/add';
import { createPlaylist } from '../../../actions/PlaylistActionCreators';

export default class NewPlaylist extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  onClick() {
    createPlaylist(prompt('Name?'));
  }

  render() {
    const { className } = this.props;
    return (
      <div
        className={cx('PlaylistMenuRow', 'PlaylistMenuRow--create', className)}
        onClick={::this.onClick}
      >
        <div className="PlaylistMenuRow-active-icon">
          <CreatePlaylistIcon color="#fff" />
        </div>
        Create Playlist
      </div>
    );
  }
}
