import cx from 'classnames';
import React from 'react';
import { selectPlaylist } from '../../../actions/PlaylistActionCreators';
import Icon from '../../Icon';

export default class Menu extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    playlist: React.PropTypes.object
  };

  render() {
    const { className, playlist } = this.props;
    const activeClass = playlist.active && 'is-active';
    const selectedClass = playlist.selected && 'is-selected';
    return (
      <div
        className={cx('PlaylistMenuRow', activeClass, selectedClass, className)}
        onClick={selectPlaylist.bind(null, playlist.id)}
      >
        {playlist.active ? <Icon name="checkbox" className="PlaylistMenuRow-active-icon" /> : ''}
        {playlist.name}
        <span className="PlaylistMenuRow-count">{playlist.count}</span>
      </div>
    );
  }
}
