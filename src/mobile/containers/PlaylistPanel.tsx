import PlaylistPanel from '../components/PlaylistManager/PlaylistPanel';
import { filteredSelectedPlaylistItemsSelector } from '../../reducers/playlists';
import { useSelector } from '../../hooks/useRedux';

function PlaylistPanelContainer() {
  const media = useSelector(filteredSelectedPlaylistItemsSelector);

  const items = media!;
  return (
    <PlaylistPanel items={items} />
  );
}

export default PlaylistPanelContainer;
