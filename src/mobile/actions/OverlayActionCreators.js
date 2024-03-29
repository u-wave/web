import { toggleOverlay } from '../../reducers/activeOverlay';
import { selectPlaylist } from '../../reducers/playlists';

export function openPlaylist(playlistID) {
  return (dispatch) => {
    dispatch(toggleOverlay('playlistManager'));
    dispatch(selectPlaylist(playlistID));
  };
}

export function toggleServerList() {
  return toggleOverlay('serverList');
}
