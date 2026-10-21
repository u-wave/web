import PlaylistEmpty from '../../../components/PlaylistManager/Panel/PlaylistEmpty';
import type { PlaylistItem } from '../../../reducers/playlists';
import MediaList from '../MediaList';

type PlaylistPanelProps = {
  items: (PlaylistItem | null)[],
};
function PlaylistPanel({ items }: PlaylistPanelProps) {
  return (
    <div className="PlaylistPanel">
      {items.length > 0 ? <MediaList className="PlaylistPanel-media" media={items} /> : <PlaylistEmpty />}
    </div>
  );
}

export default PlaylistPanel;
