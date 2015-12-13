import cx from 'classnames';
import React from 'react';
import OverlayHeader from '../../Overlay/Header';
import SearchBar from './SearchBar';

const PlaylistManagerHeader = ({ className, searchSource, onCloseOverlay, onSearchSubmit }) => {
  return (
    <OverlayHeader
      className={cx('PlaylistHeader', className)}
      title="Playlists"
      onCloseOverlay={onCloseOverlay}
    >
      <SearchBar
        className="PlaylistHeader-search"
        source={searchSource}
        onSubmit={onSearchSubmit}
      />
    </OverlayHeader>
  );
};

export default PlaylistManagerHeader;
