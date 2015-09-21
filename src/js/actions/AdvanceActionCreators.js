import dispatcher from '../dispatcher';

/**
 * Set the current song and DJ.
 */
export function advance({ media, dj, historyID, playlistID, played }) {
  dispatcher.dispatch({
    action: 'advance',
    media, dj, historyID, playlistID,
    timestamp: played
  });
}
