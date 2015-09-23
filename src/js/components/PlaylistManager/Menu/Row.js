import cx from 'classnames';
import React from 'react';

const selectPlaylist = () => null;

export default class Menu extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    playlist: React.PropTypes.object
  };

  render() {
    const { className, playlist } = this.props;
    const activeClass = playlist.active && 'PlaylistMenuRow--active';
    const selectedClass = playlist.selected && 'PlaylistMenuRow--selected';
    return (
      <div
        className={cx('PlaylistMenuRow', activeClass, selectedClass, className)}
        onClick={selectPlaylist}
      >
        {playlist.name}
      </div>
    );
  }
}
