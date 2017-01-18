import { togglePlaylistManager } from '../../actions/OverlayActionCreators';
import { selectPlaylist } from '../../actions/PlaylistActionCreators';

export function openPlaylist(playlistID) {
  return (dispatch) => {
    dispatch(togglePlaylistManager());
    dispatch(selectPlaylist(playlistID));
  };
}
