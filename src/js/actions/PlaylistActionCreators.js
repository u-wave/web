import dispatcher from '../dispatcher';

export function setPlaylists(playlists) {
  dispatcher.dispatch({
    action: 'playlists',
    playlists: playlists
  });
}

export function setCurrent(playlistID) {
  dispatcher.dispatch({
    action: 'setCurrentPlaylist',
    playlistID: playlistID
  });
}
