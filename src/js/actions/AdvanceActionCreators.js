import { dispatch } from '../dispatcher';

/**
 * Set the current song and DJ.
 */
export function advance({ media, dj, historyID, playlistID, played }) {
  dispatch({
    type: 'advance',
    payload: {
      media, dj, historyID, playlistID,
      timestamp: played
    }
  });
}
