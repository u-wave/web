import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import CreatePlaylistIcon from 'material-ui/lib/svg-icons/content/add';
import muiThemeable from 'material-ui/lib/muiThemeable';

@muiThemeable
export default class NewPlaylist extends Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    muiTheme: PropTypes.object
  };

  render() {
    const { className, onClick, muiTheme } = this.props;
    return (
      <div
        role="menuitem"
        className={cx('PlaylistMenuRow', 'PlaylistMenuRow--create', className)}
        onClick={onClick}
      >
        <div className="PlaylistMenuRow-title">
          <div className="PlaylistMenuRow-active-icon">
            <CreatePlaylistIcon color={muiTheme.rawTheme.palette.textColor} />
          </div>
          Create Playlist
        </div>
      </div>
    );
  }
}
