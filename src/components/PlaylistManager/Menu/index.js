import cx from 'classnames';
import * as React from 'react';
import PlaylistRow from './Row';
import PlaylistCreateRow from './NewPlaylist';
import SearchResultsRow from './SearchResultsRow';
import PlaylistImportRow from './PlaylistImportRow';

const Menu = ({
  className, playlists, searchQuery, searchResults,
  selected, showSearchResults, showImportPanel,
  onCreatePlaylist, onSelectPlaylist, onSelectSearchResults, onAddToPlaylist,
  onShowImportPanel
}) => {
  const searchIsSelected = showSearchResults ? 'is-selected' : '';
  const importIsSelected = showImportPanel ? 'is-selected' : '';
  const isSelectingPlaylist = selected && !showSearchResults && !showImportPanel;
  return (
    <div
      role="menu"
      className={cx('PlaylistMenu', className)}
    >
      <PlaylistCreateRow
        className="PlaylistMenu-row"
        onCreatePlaylist={onCreatePlaylist}
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
          selected={isSelectingPlaylist && selected._id === pl._id}
          onClick={() => onSelectPlaylist(pl)}
          onAddToPlaylist={onAddToPlaylist}
        />
      ))}
      <PlaylistImportRow
        className={cx('PlaylistMenu-row', importIsSelected)}
        onClick={onShowImportPanel}
      />
    </div>
  );
};

Menu.propTypes = {
  className: React.PropTypes.string,
  playlists: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  selected: React.PropTypes.object.isRequired,
  showSearchResults: React.PropTypes.bool.isRequired,
  showImportPanel: React.PropTypes.bool.isRequired,
  searchQuery: React.PropTypes.string.isRequired,
  searchResults: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onCreatePlaylist: React.PropTypes.func.isRequired,
  onSelectPlaylist: React.PropTypes.func.isRequired,
  onSelectSearchResults: React.PropTypes.func.isRequired,
  onAddToPlaylist: React.PropTypes.func.isRequired,
  onShowImportPanel: React.PropTypes.func.isRequired
};

export default Menu;
