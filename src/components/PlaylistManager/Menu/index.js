import cx from 'classnames';
import * as React from 'react';
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
      {playlists.map(pl => (
        <PlaylistRow
          key={pl._id}
          className="PlaylistMenu-row"
          playlist={pl}
          onClick={() => onSelectPlaylist(pl)}
          onAddToPlaylist={onAddToPlaylist}
        />
      ))}
    </div>
  );
};

Menu.propTypes = {
  className: React.PropTypes.string,
  playlists: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  selected: React.PropTypes.bool.isRequired,
  searchQuery: React.PropTypes.string.isRequired,
  searchResults: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onCreatePlaylist: React.PropTypes.func.isRequired,
  onSelectPlaylist: React.PropTypes.func.isRequired,
  onSelectSearchResults: React.PropTypes.func.isRequired,
  onAddToPlaylist: React.PropTypes.func.isRequired
};

export default Menu;
