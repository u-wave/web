import cx from 'clsx';
import { useCallback } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import OverlayContent from '../Overlay/Content';
import PlaylistMenu from '../../containers/PlaylistManagerMenu';
import PlaylistPanel from '../../containers/PlaylistManagerPanel';
import PlaylistImport from '../../containers/PlaylistImportManager';
import SearchResults from '../../containers/SearchResultsPanel';
import MediaSearchBar from './Header/SearchBar';
import PlaylistHeader from './Header';
import NoPlaylists from './NoPlaylists';
import { useDispatch, useSelector } from '../../hooks/useRedux';
import { createPlaylist, importPanelSymbol, searchPanelSymbol } from '../../reducers/playlists';
import './index.css';

type PlaylistManagerProps = {
  className?: string,
  onCloseOverlay: () => void,
};
function PlaylistManager({
  className,
  onCloseOverlay,
}: PlaylistManagerProps) {
  const showPanel = useSelector((state) => state.playlists.selectedPlaylistID);

  const { t } = useTranslator();
  const dispatch = useDispatch();
  const onCreatePlaylist = useCallback(() => (
    dispatch(createPlaylist(t('playlists.defaultName')))
  ), [dispatch, t]);

  let panel;
  let empty = false;

  if (showPanel === importPanelSymbol) {
    panel = (
      <div className="PlaylistPanel">
        <PlaylistImport />
      </div>
    );
  } else if (showPanel === searchPanelSymbol) {
    panel = <SearchResults />;
  } else if (typeof showPanel === 'string') {
    // Give this a key so it's remounted when you switch playlists.
    // This is because there is some statefulness down the tree, especially
    // in playlist filters and scroll position.
    // By forcing a remount using a key we throw away all state and keep it
    // consistent.
    panel = <PlaylistPanel key={showPanel} />;
  } else {
    empty = true;
  }

  return (
    <div className={cx('PlaylistManager', className)}>
      <PlaylistHeader
        className="PlaylistManager-header AppRow AppRow--top"
        onCloseOverlay={onCloseOverlay}
      >
        {!empty && <MediaSearchBar className="PlaylistManager-searchBar" />}
      </PlaylistHeader>

      <OverlayContent>
        {empty ? (
          <NoPlaylists onCreatePlaylist={onCreatePlaylist} />
        ) : (
          <>
            <PlaylistMenu className="PlaylistManager-menu" />
            <div className="PlaylistManager-panel">
              {panel}
            </div>
          </>
        )}
      </OverlayContent>
    </div>
  );
}

export default PlaylistManager;
