import MenuList from '@mui/material/MenuList';
import cx from 'clsx';
import { importPanelSymbol, type NewPlaylistItem, type Playlist, searchPanelSymbol } from '../../../reducers/playlists';
import PlaylistCreateRow from './NewPlaylist';
import PlaylistImportRow from './PlaylistImportRow';
import PlaylistRow from './Row';
import SearchResultsRow from './SearchResultsRow';

type PlaylistMenuProps = {
  className?: string,
  playlists: Playlist[],
  selected: string | symbol | null,
  searchQuery?: string | null,
  onCreatePlaylist: (name: string) => Promise<void>,
  onSelectPlaylist: (id: string) => void,
  onSelectSearchResults: () => void,
  onCloseSearchResults: () => void,
  onAddToPlaylist: (playlist: Playlist, items: NewPlaylistItem[]) => Promise<void>,
  onShowImportPanel: () => void,
  onActivatePlaylist: (id: string) => void,
};
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
  onActivatePlaylist,
}: PlaylistMenuProps) {
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
          onDoubleClick={() => onActivatePlaylist(pl._id)}
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

export default PlaylistMenu;
