import { dispatch } from '../dispatcher';
import { flattenPlaylistItem } from './PlaylistActionCreators';

/**
 * Set the current song and DJ.
 */
export function advance({ media, userID, historyID, playlistID, played }) {
  dispatch({
    type: 'advance',
    payload: {
      userID, historyID, playlistID,
      media: flattenPlaylistItem(media),
      timestamp: played
    }
  });
}
