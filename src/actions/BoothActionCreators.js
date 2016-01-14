import { ADVANCE } from '../constants/actionTypes/booth';
import { flattenPlaylistItem } from './PlaylistActionCreators';

/**
 * Set the current song and DJ.
 */
export function advance(nextBooth) {
  if (!nextBooth) {
    return {
      type: ADVANCE,
      payload: null
    };
  }
  const { media, userID, historyID, playlistID, played } = nextBooth;
  return {
    type: ADVANCE,
    payload: {
      userID, historyID, playlistID,
      media: flattenPlaylistItem(media),
      timestamp: played
    }
  };
}
