import { useSelector } from '../../hooks/useRedux';
import { filteredSelectedPlaylistItemsSelector } from '../../reducers/playlists';
import PlaylistPanel from '../components/PlaylistManager/PlaylistPanel';

function PlaylistPanelContainer() {
  const media = useSelector(filteredSelectedPlaylistItemsSelector);

  const items = media!;
  return <PlaylistPanel items={items} />;
}

export default PlaylistPanelContainer;
