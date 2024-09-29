import { toggleOverlay } from '../../reducers/activeOverlay';
import { selectPlaylist } from '../../reducers/playlists';
import type { Thunk } from '../../redux/api';

export function openPlaylist(playlistID: string): Thunk<void> {
  return (dispatch) => {
    dispatch(toggleOverlay('playlistManager'));
    dispatch(selectPlaylist(playlistID));
  };
}

export function toggleServerList() {
  return toggleOverlay('serverList');
}
