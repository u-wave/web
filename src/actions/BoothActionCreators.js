import { ADVANCE } from '../constants/actionTypes/booth';
import { flattenPlaylistItem } from './PlaylistActionCreators';

/**
 * Set the current song and DJ.
 */
export function advance({ media, userID, historyID, playlistID, played }) {
  return {
    type: ADVANCE,
    payload: {
      userID, historyID, playlistID,
      media: flattenPlaylistItem(media),
      timestamp: played
    }
  };
}
