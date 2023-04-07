import cx from 'clsx';
import PropTypes from 'prop-types';
import MenuList from '@mui/material/MenuList';
import PlaylistRow from './Row';
import PlaylistCreateRow from './NewPlaylist';
import SearchResultsRow from './SearchResultsRow';
import PlaylistImportRow from './PlaylistImportRow';
import { importPanelSymbol, searchPanelSymbol } from '../../../reducers/playlists';

function PlaylistMenu({
  className,
  playlists,
  selected,
  searchQuery,
  onCreatePlaylist,
  onSelectPlaylist,
  onSelectSearchResults,
  onCloseSearchResults,
  onAddToPlaylist,
  onShowImportPanel,
}) {
  return (
    <MenuList className={cx('PlaylistMenu', className)} disablePadding>
      <PlaylistCreateRow
        className="PlaylistMenu-row"
        onCreatePlaylist={onCreatePlaylist}
      />
      {searchQuery && (
        <SearchResultsRow
          className={cx('PlaylistMenu-row', selected === searchPanelSymbol && 'is-selected')}
          query={searchQuery}
          onClick={onSelectSearchResults}
          onClose={onCloseSearchResults}
        />
      )}
      {playlists.map((pl) => (
        <PlaylistRow
          key={pl._id}
          className="PlaylistMenu-row"
          playlist={pl}
          selected={selected === pl._id}
          onClick={() => onSelectPlaylist(pl._id)}
          onAddToPlaylist={onAddToPlaylist}
        />
      ))}
      <PlaylistImportRow
        className={cx('PlaylistMenu-row', selected === importPanelSymbol && 'is-selected')}
        onClick={onShowImportPanel}
      />
    </MenuList>
  );
}

PlaylistMenu.propTypes = {
  className: PropTypes.string,
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.symbol,
  ]),
  searchQuery: PropTypes.string,
  onCreatePlaylist: PropTypes.func.isRequired,
  onSelectPlaylist: PropTypes.func.isRequired,
  onSelectSearchResults: PropTypes.func.isRequired,
  onCloseSearchResults: PropTypes.func.isRequired,
  onAddToPlaylist: PropTypes.func.isRequired,
  onShowImportPanel: PropTypes.func.isRequired,
};

export default PlaylistMenu;
