import cx from 'classnames';
import React from 'react';
import { createPlaylist } from '../../../actions/PlaylistActionCreators';
import Icon from '../../Icon';

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
        <Icon name="add" className="PlaylistMenuRow-active-icon" />
        Create Playlist
      </div>
    );
  }
}
