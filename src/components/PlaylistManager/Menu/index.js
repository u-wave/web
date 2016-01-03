import cx from 'classnames';
import React from 'react';
import PlaylistRow from './Row';
import PlaylistCreateRow from './NewPlaylist';
import SearchResultsRow from './SearchResultsRow';

const Menu = ({
  className, playlists, selected, searchQuery, searchResults,
  onCreatePlaylist, onSelectPlaylist, onSelectSearchResults, onAddToPlaylist
}) => {
  const searchIsSelected = selected ? '' : 'is-selected';
  return (
    <div
      role="menu"
      className={cx('PlaylistMenu', className)}
    >
      <PlaylistCreateRow
        className="PlaylistMenu-row"
        onClick={onCreatePlaylist}
      />
      {searchQuery && (
        <SearchResultsRow
          className={cx('PlaylistMenu-row', searchIsSelected)}
          query={searchQuery}
          size={searchResults}
          onClick={onSelectSearchResults}
        />
      )}
      {playlists.map(pl => {
        return (
          <PlaylistRow
            key={pl._id}
            className="PlaylistMenu-row"
            playlist={pl}
            onClick={() => onSelectPlaylist(pl)}
            onAddToPlaylist={onAddToPlaylist}
          />
        );
      })}
    </div>
  );
};

export default Menu;
