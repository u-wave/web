import { flattenPlaylistItem } from './PlaylistActionCreators';

/**
 * Set the current song and DJ.
 */
export function advance({ media, userID, historyID, playlistID, played }) {
  return {
    type: 'advance',
    payload: {
      userID, historyID, playlistID,
      media: flattenPlaylistItem(media),
      timestamp: played
    }
  };
}
