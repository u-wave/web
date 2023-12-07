import OverlayHeader from '../../../components/Overlay/Header';
import OverlayContent from '../../../components/Overlay/Content';
import PlaylistPanel from './PlaylistPanel';
import type { Playlist, PlaylistItem } from '../../../reducers/playlists';

type PlaylistManagerProps = {
  selectedPlaylist: Playlist,
  selectedItems: (PlaylistItem | null)[],
  onCloseOverlay: () => void,
};
function PlaylistManager({
  selectedPlaylist,
  selectedItems,
  onCloseOverlay,
}: PlaylistManagerProps) {
  return (
    <div className="PlaylistManager">
      <OverlayHeader
        className="PlaylistHeader"
        title={selectedPlaylist.name}
        onCloseOverlay={onCloseOverlay}
      />
      <OverlayContent>
        <PlaylistPanel items={selectedItems} />
      </OverlayContent>
    </div>
  );
}

export default PlaylistManager;
