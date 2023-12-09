import { openEditMediaDialog } from './DialogActionCreators';
import { post } from './RequestActionCreators';
import { setPlaylistFilter, loadPlaylist } from '../reducers/playlists';

// TODO It would be good to get rid of this
export function flattenPlaylistItem(item) {
  return {
    ...item.media,
    ...item,
  };
}

export function filterPlaylistItems(playlistID, filter) {
  return (dispatch) => {
    dispatch(setPlaylistFilter({ playlistID, filter }));
    dispatch(loadPlaylist({ playlistID, page: 0, filter }));
  };
}

export function cannotDeleteActivePlaylist(playlistID) {
  return {
    type: 'cannotDeleteActivePlaylist',
    error: true,
    payload: new Error('The active playlist cannot be deleted. '
      + 'Activate a different playlist first, before deleting this one.'),
    meta: { playlistID },
  };
}

export function editMedia(playlistID, media) {
  return openEditMediaDialog(playlistID, media);
}
