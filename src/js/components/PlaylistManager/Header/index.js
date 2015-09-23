import cx from 'classnames';
import React from 'react';
import OverlayHeader from '../../Overlay/Header';
import SearchBar from './SearchBar';

export default class Header extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  render() {
    return (
      <OverlayHeader
        className={cx('PlaylistHeader', this.props.className)}
        title="Playlists"
      >
        <SearchBar className="PlaylistHeader-search" />
      </OverlayHeader>
    );
  }
}
